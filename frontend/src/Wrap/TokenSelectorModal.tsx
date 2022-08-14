import styled from "styled-components";
import eth from "../../public/eth.png";
import dai from "../../public/dai.png";
import usdc from "../../public/usdc.png";
import TokenItem from "./TokenItem";
import { IoMdClose } from "react-icons/io";

const tokens = [
  { image: eth, name: "ETH", description: "Ether" },
  { image: dai, name: "DAI", description: "Dai Stablecoin" },
  { image: usdc, name: "USDC", description: "USD Coin" },
];

export default function TokenSelectorModal({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  return (
    <Wrapper>
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
          return <TokenItem key={index} token={token} />;
        })}
      </>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 500px;
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
