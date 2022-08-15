import styled from "styled-components";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ChainId() {
  //if true => false, if false => mainnet
  const [testnet, setTestnet] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const onClickTestnet = () => {
    setTestnet(true);
    setIsClicked(false);
  };
  const onClickMainnet = () => {
    setTestnet(false);
    setIsClicked(false);
  };

  return (
    <Wrapper>
      {!isClicked ? (
        <MainContainer onClick={() => setIsClicked(!isClicked)}>
          <Network>{testnet ? "Testnets" : "Mainnets"}</Network>
          <IoIosArrowDown />
        </MainContainer>
      ) : (
        <Toggle>
          <Option
            onClick={onClickMainnet}
            style={testnet === false ? selectedStyle : unselectedStyle}
          >
            Mainnets
          </Option>
          <Option
            onClick={onClickTestnet}
            style={testnet === true ? selectedStyle : unselectedStyle}
          >
            Testnets
          </Option>
        </Toggle>
      )}
    </Wrapper>
  );
}

const selectedStyle = {
  border: "none",
  background: "#fff",
  borderRadius: "5px",
  color: "#220c76",
};

const unselectedStyle = {};

const Wrapper = styled.div`
  margin-left: 1rem;
  width: 150px;
  height: 40px;
  border: 1px solid #fff;
  border-radius: 5px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Network = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Option = styled.div`
  padding: 8px;
`;
