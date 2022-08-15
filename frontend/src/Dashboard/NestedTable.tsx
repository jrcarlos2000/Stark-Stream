import styled from "styled-components";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IRealtimeBalanceProps, RealtimeBalance } from "./RealtimeBalance";
import { useRouter } from "next/router";

export type Assets = "A" | "B" | "C";

export type TokenData = {
  to: string;
  stop: boolean;
  update: any;
};

const columnHelper = createColumnHelper<TokenData>();

const tableCols = [
  columnHelper.accessor("to", {
    header: "TO",
    cell: (info) => <strong>{info.getValue()}</strong>,
  }),
  columnHelper.accessor("stop", {
    header: "STOP",
    cell: (info) => <Button>stop</Button>,
  }),
  columnHelper.accessor("update", {
    header: "UPDATE",
    cell: (info) => <Button>update</Button>,
  }),
];

export default function NestedTable({
  data,
  rowData,
}: {
  data: any;
  rowData: any;
}) {
  console.log(data, rowData);
  const table = useReactTable<TokenData>({
    columns: tableCols,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();
  const handleUpdate = () => {
    router.push(`/stream?update&tx=${rowData.id}`);
  };
  return (
    <Wrapper>
      <Title>{rowData?.original?.asset}</Title>
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
              <Row key={row.id}>
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

  background-color: #391e5a;
  border-radius: 20px;
  box-shadow: rgb(204 204 204 / 55%) 0px 0px 6px 3px;
  border: 2px solid #80b8c2;
  // padding: 28px;
`;

const Row = styled.tr`
  border-bottom: 1px solid #edf2f7;
  color: #c1c1c1;

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

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;
