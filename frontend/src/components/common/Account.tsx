import styled, { css } from "styled-components";
import { useStarknet } from "@starknet-react/core";
import Image from "next/image";
import argentx from "../../../public/argentx.png";

export default function Account({
  size = "small",
}: {
  size?: "small" | "large";
}) {
  const { account } = useStarknet();

  return (
    <Wrapper>
      {account ? (
        <>
          <Image src={argentx} width={25} height={25} />
          <Address size={size} style={{ marginLeft: "10px" }}>
            {account?.slice(0, 5)}...{account?.slice(-4)}
          </Address>
        </>
      ) : (
        <Address size={size}>Connect Wallet</Address>
      )}
    </Wrapper>
  );
}

const sizeStyles = css<{ size: string }>`
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 1.8rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1rem;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0 2rem;
  background-color: rgba(211, 210, 210, 0.2);
  margin-top: 0.7rem;
`;

const Address = styled.p`
  display: flex;
  align-items: center;
  ${sizeStyles};
`;
