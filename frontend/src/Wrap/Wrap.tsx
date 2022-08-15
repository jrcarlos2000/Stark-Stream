import styled from "styled-components";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import TokenSelectorModal from "./TokenSelectorModal";
import Modal from "react-modal";
Modal.setAppElement("#__next");
import { utils } from "ethers";
import { FormInput } from "../components/common/FormInput";
import { useStarknet } from "@starknet-react/core";
import { getAllTokenBalances } from "../utils/core";
import {
  useBTCContract,
  useDAIContract,
  useUSDTContract,
  useMBTCContract,
  useMDAIContract,
  useMUSDTContract,
} from "../hooks/TokenContracts";

export default function Wrap({ action }: { action: any }) {
  const [ref, setRef] = useState<any>();
  const [balance, setBalance] = useState("0");
  const [selectedToken, setSelectedToken] = useState("DAI");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<any>();
  const [parsedValue, setParsedValue] = useState<any>();
  const [buttonMsg, setButtonMsg] = useState<any>("Upgrade to Super Token");
  const [updatedTokenBalances, setUpdatedTokenBalances] = useState<any>();
  const [selectedTokenBal, setSelectedTokenBal] = useState<number>(0);
  const { account, connectors } = useStarknet();
  const { contract: cBTC } = useBTCContract();
  const { contract: cDAI } = useDAIContract();
  const { contract: cUSDT } = useUSDTContract();
  const { contract: cmBTC } = useMBTCContract();
  const { contract: cmDAI } = useMDAIContract();
  const { contract: cmUSDT } = useMUSDTContract();

  const contracts: any = {
    USDT: cUSDT,
    BTC: cBTC,
    DAI: cDAI,
  };

  const mcontracts: any = {
    USDT: cmUSDT,
    BTC: cmBTC,
    DAI: cmDAI,
  };

  useEffect(() => {
    //update balances
    const interval = setInterval(() => {
      if (account && cUSDT && cDAI && cBTC && cmUSDT && cmDAI && cmBTC) {
        getAllTokenBalances(
          cUSDT,
          cBTC,
          cDAI,
          cmUSDT,
          cmBTC,
          cmDAI,
          account
        ).then((data) => {
          setUpdatedTokenBalances(data);
        });
      }
    }, 4000);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  useEffect(() => {
    if (!updatedTokenBalances) return;
    console.log(
      "print balance dict: ",
      updatedTokenBalances,
      updatedTokenBalances[selectedToken]
    );
    setSelectedTokenBal(updatedTokenBalances[selectedToken]);
  }, [selectedToken, updatedTokenBalances]);

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

  const handleUpgrade = async () => {
    setButtonMsg("Loading...");
    const connectorAccount = await connectors[0].account();
    await connectorAccount.execute([
      {
        contractAddress: contracts[selectedToken]
          ? contracts[selectedToken].address
          : "",
        entrypoint: "approve",
        calldata: [
          mcontracts[selectedToken].address,
          parsedValue.toString(),
          String(0),
        ],
      },
      {
        contractAddress: mcontracts[selectedToken]
          ? mcontracts[selectedToken].address
          : "",
        entrypoint: "wrap",
        calldata: [parsedValue.toString(), String(0)],
      },
    ]);

    setButtonMsg("Upgrade to Super Token");
  };
  const onChangeValue = (e: any) => {
    if (e.target.value.toString() != "") {
      setRef(e.target.value.toString());
      setParsedValue(utils.parseEther(e.target.value.toString()));
    } else {
      setRef("0.0");
    }
  };

  const handleMax = () => {
    setValue(updatedTokenBalances[`${selectedToken}`]);
    setParsedValue(updatedTokenBalances[`${selectedToken}`]);
  };

  useEffect(() => {
    setRef(value);
  }, [value]);

  console.log("debugging selected token", selectedToken);
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
              <Balance>Balance: {selectedTokenBal}</Balance>
              <MaxButton onClick={handleMax}>MAX</MaxButton>
            </BalanceContainer>
          </TokenContainer>
        </WrappingBox>
        <AiOutlineArrowDown className="icon" />
        <WrappingBox>
          <AmountFormInput placeholder="0.0" value={ref} />
          <TokenContainer>
            <Token>m{selectedToken}</Token>
            <Balance>
              Balance:{" "}
              {updatedTokenBalances
                ? updatedTokenBalances[`m${selectedToken}`]
                : 0}
            </Balance>
          </TokenContainer>
        </WrappingBox>
      </MainContainer>
      <Unit>1 ETH = 1 ETHx</Unit>
      <Button onClick={handleUpgrade}>{buttonMsg}</Button>
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
