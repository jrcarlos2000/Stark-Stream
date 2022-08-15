import styled from "styled-components";
import Modal from "react-modal";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");
import { useEffect, useMemo, useState } from "react";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import {
  useMBTCContract,
  useUSDTContract,
  useMDAIContract,
  useMUSDTContract,
} from "../hooks/TokenContracts";
import { readListOfStreams } from "../utils/core";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Table from "./Table";
import { createColumnHelper } from "@tanstack/react-table";
import { IRealtimeBalanceProps, RealtimeBalance } from "./RealtimeBalance";
import ColoredFlowrate from "./ColoredFlowrate";

export type IOutFlowTableData = {
  id: number;
  to: string;
  flowrate: number;
  balance: IRealtimeBalanceProps;
  stop: boolean;
  update: any;
};

const columnHelper = createColumnHelper<IOutFlowTableData>();

export default function OutFlowTable({
  selectedToken,
}: {
  selectedToken: string;
}) {
  const router = useRouter();
  // CONTRACT INVOKES
  const [data, setData] = useState<any>([]);
  const handleStop = (selectedToken: string, streamId: number) => {};
  const handleUpdate = (selectedToken: string, streamId: number) => {
    router.push(
      `/stream?update&streamType=Direct&token=${selectedToken}&id=${streamId}`
    );
  };
  const { connectors, account } = useStarknet();
  const { contract: cmBTC } = useMBTCContract();
  const { contract: cmDAI } = useMDAIContract();
  const { contract: cmUSDT } = useMUSDTContract();

  const contracts: any = {
    mUSDT: cmUSDT,
    mBTC: cmBTC,
    mDAI: cmDAI,
  };

  // FETCH DATA: Outflow data of selectedToken of current user

  useEffect(() => {
    //update balances
    const interval = setInterval(() => {
      readListOfStreams(contracts[selectedToken], account).then((data: any) => {
        setData(data);
      });
    }, 6000);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  console.log("debugging outflow table", selectedToken);

  // PREPARE COLUMN
  const columns = useMemo(
    () => [
      columnHelper.accessor("to", {
        header: "To",
        cell: (info) => <strong>{info.getValue()}</strong>,
      }),
      columnHelper.accessor("flowrate", {
        header: "Flow rate",
        cell: (info) => <ColoredFlowrate flowrate={info.getValue()} />,
      }),
      columnHelper.accessor("balance", {
        header: "Balance",
        cell: (info) => <RealtimeBalance {...info.getValue()} />,
      }),
      columnHelper.accessor("id", {
        header: "Stop",
        cell: (info) => {
          const streamId = info.row.original.id;
          return (
            <Button
              type="primary"
              onClick={() => handleStop(selectedToken, streamId)}
              shape="circle"
              icon={<DeleteOutlined />}
            />
          );
        },
      }),
      columnHelper.accessor("id", {
        header: "Update",
        cell: (info) => {
          const streamId = info.row.original.id;
          return (
            <Button
              type="primary"
              onClick={() => handleUpdate(selectedToken, streamId)}
              shape="circle"
              icon={<EditOutlined />}
            />
          );
        },
      }),
    ],
    [columnHelper, selectedToken, handleStop, handleUpdate]
  );

  return (
    <Table
      title={`Outflow Tokens: ${selectedToken}`}
      columns={columns}
      data={data}
    />
  );
}

const Wrapper = styled.div``;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

// const Button = styled.button`
//   &:hover {
//     cursor: pointer;
//   }
// `;
