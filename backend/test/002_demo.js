// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const {NFTStorage , Blob} = require('nft.storage');
const axios = require("axios").default;
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
  ArgentAccount,
  OpenZeppelinAccount,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const {
  iterativelyCheckStatus,
} = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const ERC721_name = starknet.shortStringToBigInt("Carlos");
const ERC721_symbol = starknet.shortStringToBigInt("CAR");
const tokenDecimals = ethers.utils.parseUnits("1");
let cAccount, cAccount2, cCore,cUserRegistry;


const MTOKEN = "m_token";
const TOKEN = "ERC20";
const USDT = 'USDT';
const mUSDT = 'mUSDT';
const DAI = 'DAI';
const mDAI = 'mDAI';
const BTC = 'BTC';
const mBTC = 'mBTC';

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
function divideLongString (longString) {
  let str_arr = []
  let i = 0
  while (i < longString.length - 31){
      let temp = longString.slice(i,i+31)
      temp = stringToFelt(temp)
      str_arr.push(temp)
      i = i + 31;
  }
  let temp = longString.slice(i,longString.length);
  if(temp.length > 0) {
    temp = stringToFelt(temp)
    str_arr.push(temp)
  }
  return str_arr;
}
describe("demo Scripts", function () {
  this.timeout(10000_000);

  if (process.env.FLAGS != "demo") return;

  it("add projects", async function () {
    if (starknet.network == "devnet") {
      let accounts = await starknet.devnet.getPredeployedAccounts();
      cAccount = await starknet.getAccountFromAddress(accounts[1].address,accounts[1].private_key,'OpenZeppelin');
    }

    console.log('funding Accounts with eth');
    const accountsToFund = process.env.ACCOUNTS.split(',');

    for(let i=0;i<accountsToFund.length;i++){
      await axios.post("http://localhost:5050/mint", {
      'address' : `${accountsToFund[i]}`,
      'amount' : 10000000000000000000
      });
    }

    let addressesFile = fs.readFileSync('../frontend/src/utils/addresses.json');
    let addresses = JSON.parse(addressesFile);

    const cfMToken = await starknet.getContractFactory(MTOKEN);
    const cfToken = await starknet.getContractFactory(TOKEN);
    const cUSDT = await cfToken.getContractAt(addresses[USDT]);
    
    for(let i=0;;i++){
      await cAccount.invoke(cUSDT,'faucet',{});
    }

  })
});
