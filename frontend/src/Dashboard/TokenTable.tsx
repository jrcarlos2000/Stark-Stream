import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { capitalize } from "../utils/capitalize";
import styled from "styled-components";
import { IRealtimeBalanceProps, RealtimeBalance } from "./RealtimeBalance";
import { useRouter } from "next/router";


export type Assets = "A" | "B" | "C";

export type TokenData = {
  asset: string;
  balance: IRealtimeBalanceProps;
  netFlow: number;
  inflow: string;
  image: any;
};

const columnHelper = createColumnHelper<TokenData>();

const tableCols = [
  columnHelper.accessor("asset", {
    header: "ASSET",
    cell: (info) => (
      <strong>
        <Link href={"/"}>{info.getValue()}</Link>
      </strong>
    ),
  }),
  columnHelper.accessor("balance", {
    header: "BALANCE",
    cell: (info) => {
      const realtimeBalDetails = info.getValue();
    return (
    <Link href={"/"}>
      <RealtimeBalance {...realtimeBalDetails} />
    </Link>
  )
    }
  }),
  columnHelper.accessor("netFlow", {
    header: "NET FLOW",
    cell: (info) => {
      const netInflow = info.getValue();
      const color = netInflow >= 0 ? "#00ff00" : "#ff9100";
      const signedInflow = netInflow >= 0 ? "+"+netInflow : netInflow;
    return <Link href={"/"}><span style={{ color }}>{signedInflow}</span></Link>
    },
  }),
  columnHelper.accessor("netFlow", {
    header: "In / Out",
    cell: (info) => {
      const netInflow = info.getValue();
      const color = netInflow >= 0 ? "#00ff00" : "#ff9100";
      const signedInflow = netInflow >= 0 ? "+"+netInflow : netInflow;
    return <Link href={"/"}><span style={{ color }}>{signedInflow}</span></Link>
    },
  }),
];


export default function TokenTable({ data }: { data: TokenData[] }) {
  const table = useReactTable<TokenData>({
    columns: tableCols,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();
  const handleClickActiveStream = (id: number) => {
    router.push(`/stream?update&tx=${id}`);
  }

  return (
    <Wrapper>
      <Title>Super Tokens</Title>
      <MainContainer>
        <TableContainer>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ width: "10rem" }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </Row>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Row key={row.id} onClick={() => handleClickActiveStream(row.id)}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </Row>
            ))}
          </tbody>
        </TableContainer>
      </MainContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(70vw);
`;

const Title = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const MainContainer = styled.div`
  border: 1px solid #aeaeaf;
  border-radius: 10px;
  padding: 2rem;
  
  background-color: #391E5A;
  border-radius: 20px;
  box-shadow: rgb(204 204 204 / 55%) 0px 0px 6px 3px;
  border: 2px solid #80b8c2;
  // padding: 28px;
`;

const Row = styled.tr`
  border-bottom: 1px solid #edf2f7;
  color: #c1c1c1;
  &:hover {
    background: #633bb95e;
    cursor: pointer;
  }
  th,
  td {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  td {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  th {
    color: #fff;
    font-size: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
`;

const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  a {
    text-decoration: none;
    color: #fff;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`;

const ChallengeStatusPill = styled.span`
  border-radius: 24px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  font-size: 12px;
  font-weight: 600;
`;
