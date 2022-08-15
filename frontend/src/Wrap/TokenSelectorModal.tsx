import styled, { css } from "styled-components";
import eth from "../../public/eth.png";
import dai from "../../public/dai.png";
import usdc from "../../public/usdc.png";
import TokenItem from "./TokenItem";
import { IoMdClose } from "react-icons/io";

const tokens = [
  { image: eth, name: "USDT", description: "Usd Stable Coin" },
  { image: dai, name: "DAI", description: "dai Stable Coin" },
  { image: usdc, name: "BTC", description: "Bitcoin" },
];

export default function TokenSelectorModal({
  isModalOpen,
  setIsModalOpen,
  selectedToken,
  setSelectedToken,
  action,
}: {
  selectedToken: any;
  setSelectedToken: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  action: any;
}) {
  return (
    <Wrapper isModalOpen={isModalOpen}>
      <TitleContainer>
        <Title>Select a token</Title>
        <IoMdClose
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
      </TitleContainer>
      <Divider />
      <>
        {tokens.map((token, index) => {
          return (
            <TokenItem
              setIsModalOpen={setIsModalOpen}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              action={action}
              key={index}
              token={token}
            />
          );
        })}
      </>
    </Wrapper>
  );
}

const openModal = css<{ isModalOpen: boolean }>`
  ${(props) =>
    props.isModalOpen &&
    css`
      overflow: hidden;
    `}
`;

const Wrapper = styled.div`
  width: 500px;
  ${openModal}
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 0 1.3rem;
  & > svg {
    color: #666464;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.p``;

const Divider = styled.div`
  border-top: 1px solid #dddcdc;
`;
