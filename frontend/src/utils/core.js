import { formatEther } from "ethers/lib/utils";
import { bnToUint256, uint256ToBN } from "starknet/dist/utils/uint256";

export async function parseTokenData(mUSTBalance, mDAIBalance, mBTCBalance){
    //perform other operations here
    return [{
        asset: "mUSDT",
        balance: {
          startTime: Date.now(),
          flowrate: 0,
          staticBalance: uint256ToBN(mUSTBalance[0])
        },
        netFlow: 10,
        inflow: "done",
        image: "",
      },
      {
        asset: "mBTC",
        balance: {
          startTime: Date.now(),
          flowrate: 0,
          staticBalance: uint256ToBN(mDAIBalance[0])
        },
        netFlow: -19,
        inflow: "done",
        image: "",
      },
      {
        asset: "mDAI",
        balance: {
          startTime: Date.now(),
          flowrate: 0,
          staticBalance: uint256ToBN(mBTCBalance[0])
        },
        netFlow: 72,
        inflow: "done",
        image: "",
      }
    ]
}   

export async function getAllTokenBalances (USDTContract, BTCContract, DAIContract, mUSDTContract, mBTCContract, mDAIContract,account){

    try{
    const USDT_balance = await USDTContract.balanceOf(account);
    const BTC_balance = await BTCContract.balanceOf(account);
    const DAI_balance = await DAIContract.balanceOf(account);

    const mUSDT_balance = await mUSDTContract.balance_of(account);
    const mBTC_balance = await mBTCContract.balance_of(account);
    const mDAI_balance = await mDAIContract.balance_of(account);

    return {
        'USDT' : formatEther(uint256ToBN(USDT_balance[0]).toString()),
        'BTC' : formatEther(uint256ToBN(BTC_balance[0]).toString()),
        'DAI' : formatEther(uint256ToBN(DAI_balance[0]).toString()),
        'mUSDT' : formatEther(uint256ToBN(mUSDT_balance[0]).toString()),
        'mBTC' : formatEther(uint256ToBN(mBTC_balance[0]).toString()),
        'mDAI' : formatEther(uint256ToBN(mDAI_balance[0]).toString())
    }
    }catch(e){
        return {
        'USDT' : 0.0,
        'BTC' : 0.0,
        'DAI' : 0.0,
        'mUSDT' : 0.0,
        'mBTC' : 0.0,
        'mDAI' : 0.0
        }
    }
}