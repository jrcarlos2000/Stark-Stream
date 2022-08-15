import { useConnectors } from "@starknet-react/core";
import styled from "styled-components";
import Account from "../components/common/Account";

type ConnectProps = { account: string | undefined };

export default function Connect({ account }: ConnectProps) {
  const { available, connect, disconnect } = useConnectors();
  console.log(available);
  return (
    <Wrapper>
      {account ? (
        <AccountContainer onClick={() => disconnect()}>
          <Account />
        </AccountContainer>
      ) : (
        <AccountContainer onClick={() => connect(available[0])}>
          <Account />
        </AccountContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  line-height: 0.7rem;
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
