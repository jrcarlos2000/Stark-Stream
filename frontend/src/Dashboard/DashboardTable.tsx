import styled from "styled-components";
import Modal from "react-modal";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");
import { useEffect, useState } from "react";
import TokenTable, { TokenData } from "./TokenTable";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { usemBTCContract,useUSDTContract, usemDAIContract, usemUSDTContract } from "../hooks/TokenContracts";
import {parseTokenData} from "../utils/core";

export default function DashboardTable() {

  const {account} = useStarknet();
  const {contract : cmBTC} = usemBTCContract();
  const {contract : cmDAI} = usemDAIContract();
  const {contract : cmUSDT} = usemUSDTContract();
  const [data, setData] = useState<any>({});

  const {data : mBTC_balance_result} = useStarknetCall({
    contract: cmBTC,
    method: "balance_of",
    args: [account ? account : "0"],
    options: { watch: true },
  });
  const {data : mUSDT_balance_result} = useStarknetCall({
    contract: cmUSDT,
    method: "balance_of",
    args: [account ? account : "0"],
    options: { watch: true },
  });
  const {data : mDAI_balance_result} = useStarknetCall({
    contract: cmDAI,
    method: "balance_of",
    args: [account ? account : "0"],
    options: { watch: true },
  });

  useEffect(()=>{
    async function AsyncFn (){
      if(mBTC_balance_result && mBTC_balance_result.length > 0 &&
        mUSDT_balance_result && mUSDT_balance_result.length > 0 &&
        mDAI_balance_result && mDAI_balance_result.length > 0){
        setData(await parseTokenData(mUSDT_balance_result,mDAI_balance_result,mBTC_balance_result))
      }
    }
    AsyncFn();
  },[mBTC_balance_result,mUSDT_balance_result,mDAI_balance_result])

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "1rem",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(168, 180, 202, 0.75)",
    },
  };
  return (
    <Wrapper>
      <MainContainer>
        <TableContainer>
          <TokenTable data={data} />
        </TableContainer>
      </MainContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const TableContainer = styled.div``;
