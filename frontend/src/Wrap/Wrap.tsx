import styled from "styled-components";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef } from "react";
import TokenSelectorModal from "./TokenSelectorModal";
import Modal from "react-modal";
Modal.setAppElement("#__next");
import { BigNumber, utils } from "ethers";
import { FormInput } from "../components/common/FormInput";

export default function Wrap({ action }: { action: any }) {
  const [ref, setRef] = useState();
  const [balance, setBalance] = useState("0");
  const [selectedToken, setSelectedToken] = useState("DAI");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<any>();
  const [parsedValue, setParsedValue] = useState<any>();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "0",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      border: "none",
      borderRadius: "15px",
      fontFamily: "Poppins",
    },
    overlay: {
      backgroundColor: "rgba(41, 46, 55, 0.75)",
    },
  };

  const onChangeValue = (e: any) => {
    if (e.target.value.toString() != "") {
      setRef(e.target.value.toString());
      setParsedValue(utils.parseEther(e.target.value.toString()));
    }
  };

  console.log(parsedValue);
  return (
    <Wrapper>
      <MainContainer>
        <WrappingBox>
          <AmountFormInput
            placeholder="0.0"
            value={value}
            onChange={onChangeValue}
          />
          <TokenContainer>
            <TokenSelector onClick={() => setIsModalOpen(true)}>
              <p>{selectedToken}</p>
              <IoIosArrowDown />
            </TokenSelector>
            <BalanceContainer>
              <Balance>Balance: {balance}</Balance>
              <MaxButton>MAX</MaxButton>
            </BalanceContainer>
          </TokenContainer>
        </WrappingBox>
        <AiOutlineArrowDown className="icon" />
        <WrappingBox>
          <AmountFormInput placeholder="0.0" value={ref} />
          <TokenContainer>
            <Token>{selectedToken}x</Token>
            <Balance>Balance: {balance}</Balance>
          </TokenContainer>
        </WrappingBox>
      </MainContainer>
      <Unit>1 ETH = 1 ETHx</Unit>
      <Button>Upgrade to Super Token</Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <TokenSelectorModal
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          action={action}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 1.5rem;
`;

const MainContainer = styled.div`
  .icon {
    border: 2px solid #fff;
    box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
    border-radius: 50%;
    font-size: 2rem;
    padding: 5px;
    color: #fff;
    font-weight: 600;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 180px;
  }
`;

const WrappingBox = styled.div`
  padding: 1rem 1.3rem;
  box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
  border: none;
  border-radius: 0.7rem;
  display: flex;
  justify-content: space-between;
`;

const AmountFormInput = styled(FormInput)``;

const TokenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Token = styled.div`
  border: 2px solid #949494;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  padding: 0.2rem 0.5rem;
`;

const TokenSelector = styled(Token)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 0;
  &:hover {
    cursor: pointer;
  }
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Balance = styled.div``;

const MaxButton = styled.button`
  margin-left: 0.3rem;
  background-color: #fff;
  color: #5951c3;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
  padding: 0.3rem 0.5rem;
  &:hover {
    cursor: pointer;
    color: #fff;
    border: 1px solid #5951c3;
    background-color: #5951c3;
    box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
  }
`;

const Unit = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  margin: 1.5rem 0;
`;

const Button = styled.button`
  border-radius: 0.7rem;
  border: none;
  padding: 1rem 1.3rem;
  background: #5951c3;
  color: #fff;
  font-size: 0.9rem;
  font-family: Poppins;
  width: 100%;
  &:hover {
    box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
    cursor: pointer;
  }
`;
