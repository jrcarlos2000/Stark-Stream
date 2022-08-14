import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import GlowingContainer, { ITxData } from "../src/Stream/GlowingContainer";

const Send: NextPage = () => {
  const router = useRouter();

  // stream SEND and UPDATE all go through this component
  const query = useMemo(() => {
    if (router.query.hasOwnProperty("update")) {
      // fetch streaming data from contract
      // test data
      const updateData: ITxData = {
        receiver: "0x999",
        token: "USDC",
        flowrate: 0.666,
        endsOn: 0,
      }
      return {
        mode: "Update",
        txData: updateData
      }
    } else {
      return {
        mode: "Send",
        txData: null
      }
    }
  }, [router.query])

  return (
    <Wrapper>
      <MainContainer>
        <GlowingContainer {...query} />
      </MainContainer>
    </Wrapper>
  );
};

export default Send;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const MainContainer = styled.div``;
