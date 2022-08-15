import styled from "styled-components";
import Modal from "react-modal";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");
import { useEffect, useMemo, useState } from "react";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { usemBTCContract, useUSDTContract, usemDAIContract, usemUSDTContract } from "../hooks/TokenContracts";
import { parseTokenData } from "../utils/core";

import Table from "./Table";
import { createColumnHelper } from "@tanstack/react-table";
import { IRealtimeBalanceProps, RealtimeBalance } from "./RealtimeBalance";
import ColoredFlowrate from "./ColoredFlowrate";

export type IOutFlowTableData = {
    id: number;
    to: string;
    flowrate: number;
    balance: number;
    stop: boolean;
    update: any;
};

const columnHelper = createColumnHelper<IOutFlowTableData>();

export default function OutFlowTable({selectedToken}: {selectedToken: string}) {
    // CONTRACT INVOKES
    const handleStop = (streamId: number) => {}
    const handleUpdate = (streamId: number) => {}

    // FETCH DATA: Outflow data of selectedToken of current user
    const data = [
        {
            id: 1,
            to: "carlos",
            flowrate: 123,
            balance: 1,
            stop: true,
            update: true,
        }
    ]

    // PREPARE COLUMN
    const columns = useMemo(() => [
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
            cell: (info) => <strong>{info.getValue()}</strong>,
        }),
        columnHelper.accessor("id", {
            header: "Stop",
            cell: (info) => {
                const streamId = info.row.original.id
                return <Button onClick={() => handleStop(streamId)}>stop</Button>
            }
        }),
        columnHelper.accessor("id", {
            header: "Updat",
            cell: (info) => {
                const streamId = info.row.original.id
                return <Button onClick={() => handleUpdate(streamId)}>update</Button>
            },
        }),
    ], [columnHelper, handleStop, handleUpdate]);

    return (
        <Table title={`Outflow Tokens: ${selectedToken}`} columns={columns} data={data} />
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