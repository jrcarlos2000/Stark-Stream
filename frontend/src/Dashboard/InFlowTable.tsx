import styled from "styled-components";
import Modal from "react-modal";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");
import { useEffect, useState } from "react";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import {
  useMBTCContract,
  useUSDTContract,
  useMDAIContract,
  useMUSDTContract,
} from "../hooks/TokenContracts";
import { parseTokenData } from "../utils/core";

import Table from "./Table";
import { createColumnHelper } from "@tanstack/react-table";
import { IRealtimeBalanceProps, RealtimeBalance } from "./RealtimeBalance";
import ColoredFlowrate from "./ColoredFlowrate";

export type TokenData = {
  asset: string;
  balance: IRealtimeBalanceProps;
  netFlow: number;
  inflow: string;
  image: any;
};

const columnHelper = createColumnHelper<TokenData>();

const columns = [
  columnHelper.accessor("asset", {
    header: "ASSET",
    cell: (info) => <strong>{info.getValue()}</strong>,
  }),
  columnHelper.accessor("balance", {
    header: "BALANCE",
    cell: (info) => {
      const realtimeBalDetails = info.getValue();
      return <RealtimeBalance {...realtimeBalDetails} />;
    },
  }),
  columnHelper.accessor("netFlow", {
    header: "Flow rate",
    cell: (info) => <ColoredFlowrate flowrate={info.getValue()} />,
  }),
];

export default function InFlowTable({
  handleExpand,
}: {
  handleExpand: (row: any) => void;
}) {
  // FETCH DATA: Inflow data of current user
  const { account } = useStarknet();
  const { contract: cmBTC } = useMBTCContract();
  const { contract: cmDAI } = useMDAIContract();
  const { contract: cmUSDT } = useMUSDTContract();
  const [data, setData] = useState<any>({});

  const { data: mBTC_balance_result } = useStarknetCall({
    contract: cmBTC,
    method: "balance_of",
    args: [account ? account : "0"],
    options: { watch: true },
  });
  const { data: mUSDT_balance_result } = useStarknetCall({
    contract: cmUSDT,
    method: "balance_of",
    args: [account ? account : "0"],
    options: { watch: true },
  });
  const { data: mDAI_balance_result } = useStarknetCall({
    contract: cmDAI,
    method: "balance_of",
    args: [account ? account : "0"],
    options: { watch: true },
  });

  useEffect(() => {
    async function AsyncFn() {
      if (
        mBTC_balance_result &&
        mBTC_balance_result.length > 0 &&
        mUSDT_balance_result &&
        mUSDT_balance_result.length > 0 &&
        mDAI_balance_result &&
        mDAI_balance_result.length > 0
      ) {

        let new_data = await parseTokenData(
            mUSDT_balance_result,
            mDAI_balance_result,
            mBTC_balance_result,
            cmUSDT,cmDAI,cmBTC,account
          ) 
        setData(
            new_data
        );
        console.log('debugging balances',new_data);
      }
    }
    AsyncFn();
  }, [mBTC_balance_result, mUSDT_balance_result, mDAI_balance_result]);

  //       const data=[{
  //     asset: "mUSDT",
  //     balance: {
  //       startTime: Date.now(),
  //       flowrate: 0,
  //       staticBalance: 0
  //     },
  //     netFlow: 10,
  //     inflow: "done",
  //     image: "",
  //   },
  //   {
  //     asset: "mBTC",
  //     balance: {
  //       startTime: Date.now(),
  //       flowrate: 0,
  //       staticBalance: 0
  //     },
  //     netFlow: -19,
  //     inflow: "done",
  //     image: "",
  //   },
  //   {
  //     asset: "mDAI",
  //     balance: {
  //       startTime: Date.now(),
  //       flowrate: 0,
  //       staticBalance: 0
  //     },
  //     netFlow: 72,
  //     inflow: "done",
  //     image: "",
  //   }
  // ]

  return (
    <Table
      title="Inflow Tokens"
      columns={columns}
      data={data}
      handleExpand={handleExpand}
    />
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
