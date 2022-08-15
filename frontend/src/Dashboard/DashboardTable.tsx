import styled from "styled-components";
import Modal from "react-modal";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");
import { useEffect, useState } from "react";
import TokenTable, { TokenData } from "./TokenTable";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { usemBTCContract,useUSDTContract, usemDAIContract, usemUSDTContract } from "../hooks/TokenContracts";
import {parseTokenData} from "../utils/core";
import InFlowTable from "./InFlowTable";
import OutFlowTable from "./OutFlowTable";

export default function DashboardTable() {
  const [selectedToken, setSelectedToken] = useState<string>("mBTC");
  const handleExpand = (row: any) => {
    const selectedToken = row.original.asset;
    console.log("selected token: ", selectedToken);
    setSelectedToken(selectedToken);  // remove the leading "m"
  }

  return (
    <Wrapper>
      <MainContainer>
        <TableContainer>
          <InFlowTable handleExpand={handleExpand} />
          <OutFlowTable selectedToken={selectedToken} />
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
