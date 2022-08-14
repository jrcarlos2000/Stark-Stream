import styled from "styled-components";
import Modal from "react-modal";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");
import { useState } from "react";
import TokenTable, { TokenData } from "./TokenTable";

const data: TokenData[] = [
  {
    asset: "A",
    balance: "someDemo",
    netFlow: "ERC721",
    inflow: "done",
    image: "",
  },
  {
    asset: "B",
    balance: "someDemo",
    netFlow: "ERC721",
    inflow: "done",
    image: "",
  },
  {
    asset: "C",
    balance: "someDemo",
    netFlow: "ERC721",
    inflow: "done",
    image: "",
  },
];

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
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
