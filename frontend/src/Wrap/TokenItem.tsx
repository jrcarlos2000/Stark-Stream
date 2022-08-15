import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

export default function Token({
  token,
  action,
  selectedToken,
  setSelectedToken,
  setIsModalOpen,
}: any) {
  const handleClick = () => {
    setSelectedToken(token.name);
    setIsModalOpen(false);
  };
  return (
    <Wrapper onClick={handleClick}>
      <Flex>
        <ImageContainer>
          <Image width="35px" height="35px" src={token.image} alt="" />
        </ImageContainer>
        <NameContainer>
          {action === "wrap" ? (
            <Name>{token.name}</Name>
          ) : (
            <Name>{token.name}x</Name>
          )}
          <Description>{token.description}</Description>
        </NameContainer>
      </Flex>
      <Balance>0</Balance>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.3rem;
  &:hover {
    background: #eeeeee;
    cursor: pointer;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin-right: 1rem;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  line-height: 0;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  line-height: 0;
  font-size: 0.8rem;
  color: #8f8e8e;
`;

const Balance = styled.div``;
