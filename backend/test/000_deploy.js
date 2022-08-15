// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const axios = require("axios").default;
const {
  ArgentAccount,
  OpenZeppelinAccount,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const {
  iterativelyCheckStatus,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const fs = require("fs");

let cAccount, cCore,cUserRegistry;

const MTOKEN = "m_token";
const TOKEN = "ERC20";

const gasAddr = {
  devnet: "0x62230ea046a9a5fbc261ac77d03c8d41e5d442db2284587570ab46455fd2488",
};

const feltToString = (val) => {
  return starknet.bigIntToShortString(val);
};
const stringToFelt = (val) => {
  return starknet.shortStringToBigInt(val);
};

const increaseTime = async (timestamp) => {
  await starknet.devnet.increaseTime(timestamp);
  await cAccount.invoke(cVault, "dummy_invoke");
  return;
};
describe("Deploying", function () {
  this.timeout(10000_000);

  if (process.env.FLAGS != "deploy") return;

  it("All Contracts", async function () {
    if (starknet.network == "devnet") {
        let account = (await starknet.devnet.getPredeployedAccounts())[0];
        cAccount = await starknet.getAccountFromAddress(account.address,account.private_key,'OpenZeppelin');
    }
    //deploying dummy tokens
    const cfToken = await starknet.getContractFactory(TOKEN);
    const cToken1 = await cfToken.deploy({
      name : stringToFelt("USDT"),
      symbol : stringToFelt("USDT"),
      initial_supply : {low : 0n, high : 0n},
      recipient : BigInt(cAccount.address)
    });

    const cToken2 = await cfToken.deploy({
      name : stringToFelt("DAI"),
      symbol : stringToFelt("DAI"),
      initial_supply : {low : 0n, high : 0n},
      recipient : BigInt(cAccount.address)
    });

    const cToken3 = await cfToken.deploy({
      name : stringToFelt("BTC"),
      symbol : stringToFelt("BTC"),
      initial_supply : {low : 0n, high : 0n},
      recipient : BigInt(cAccount.address)
    });

    //deploying m_tokens

    const cfMToken = await starknet.getContractFactory(MTOKEN);
    const cMToken1 =  await cfMToken.deploy({
      name : stringToFelt("mUSDT"), 
      symbol : stringToFelt("mUSDT"),
      owner : BigInt(cAccount.address),
      token_addr : BigInt(cToken1.address)
    });
    const cMToken2 =  await cfMToken.deploy({
      name : stringToFelt("mDAI"), 
      symbol : stringToFelt("mDAI"),
      owner : BigInt(cAccount.address),
      token_addr : BigInt(cToken2.address)
    });
    const cMToken3 =  await cfMToken.deploy({
      name : stringToFelt("mBTC"), 
      symbol : stringToFelt("mBTC"),
      owner : BigInt(cAccount.address),
      token_addr : BigInt(cToken3.address)
    });
    try {
      fs.copyFileSync(
        cfToken.abiPath,
        `../frontend/src/abis/${TOKEN}.json`
      );
      fs.copyFileSync(
        cfMToken.abiPath,
        `../frontend/src/abis/${MTOKEN}.json`
      );
    } catch (err) {
      console.error(err);
    }
    let contractAddresses = {};
    contractAddresses['USDT'] = cToken1.address;
    contractAddresses['DAI'] = cToken2.address;
    contractAddresses['BTC'] = cToken3.address;
    contractAddresses['mUSDT'] = cMToken1.address;
    contractAddresses['mDAI'] = cMToken2.address;
    contractAddresses['mBTC'] = cMToken3.address;

    console.log(contractAddresses);
    const data = JSON.stringify(contractAddresses);
    try {
      fs.writeFileSync("../frontend/src/utils/addresses.json", data);
    } catch (err) {
      console.error(err);
    }
  });
});
