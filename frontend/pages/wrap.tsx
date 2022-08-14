import type { NextPage } from "next";
import styled from "styled-components";
import WrapContainer from "../src/Wrap/WrapContainer";

const Wrap: NextPage = () => {
  return (
    <Wrapper>
      <MainContainer>
        <WrapContainer />
      </MainContainer>
    </Wrapper>
  );
};

export default Wrap;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const MainContainer = styled.div``;
