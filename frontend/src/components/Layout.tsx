import { useStarknet } from "@starknet-react/core";
import styled from "styled-components";
import React from "react";
import Header from "./Header";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { account } = useStarknet();

  return (
    <Wrapper>
      <Header account={account} />
      <Main>{children}</Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: "Poppins", "Noto Sans", sans-serif;
  color: #979595;
  background: linear-gradient(
    66.46deg,
    #03001d 24.27%,
    rgba(94, 12, 126, 0.612) 62.29%,
    #270aa9 100%
  );
  backdrop-filter: blur(400px);
`;

const Main = styled.div`
  height: 100vh;
`;
