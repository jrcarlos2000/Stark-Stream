import { useContract } from "@starknet-react/core";
import { Abi, Provider } from "starknet";
import contractAddresses from "../utils/addresses.json";
import TOKENABI from "../abis/ERC20.json";
import MTOKENABI from "../abis/m_token.json";

export function useUSDTContract() {
  return useContract({
    abi: TOKENABI as Abi,
    address: contractAddresses["USDT"],
  });
}
export function useDAIContract() {
  return useContract({
    abi: TOKENABI as Abi,
    address: contractAddresses["DAI"],
  });
}
export function useBTCContract() {
  return useContract({
    abi: TOKENABI as Abi,
    address: contractAddresses["BTC"],
  });
}
export function useMUSDTContract() {
  return useContract({
    abi: MTOKENABI as Abi,
    address: contractAddresses["mUSDT"],
  });
}
export function useMDAIContract() {
  return useContract({
    abi: MTOKENABI as Abi,
    address: contractAddresses["mDAI"],
  });
}
export function useMBTCContract() {
  return useContract({
    abi: MTOKENABI as Abi,
    address: contractAddresses["mBTC"],
  });
}
