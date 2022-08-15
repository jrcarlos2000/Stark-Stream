import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import {
  IDetailBreakdownMulti,
  IDetailBreakdownSingle,
} from "../src/Stream/DetailBreakdown";
import MultiStream from "../src/Stream/MultiStream";

const Send: NextPage = () => {
  const router = useRouter();

  // stream SEND and UPDATE all go through this component
  const query = useMemo(() => {
    console.log(router.query);
    if (router.query.hasOwnProperty("update")) {
      console.log("update test: ", router.query);
      // fetch streaming data from contract
      // test data
      const updateDataSingle: IDetailBreakdownSingle = {
        receiver: "0x999",
        token: "USDC",
        flowrate: {
          value: 0.666,
          unit: "second",
        },
      };
      // const updateDataMulti: IDetailBreakdownMulti = {
      //   receivers: [
      //     {addr: "0x123", perc: 20},
      //     {addr: "0x456", perc: 80}
      //   ],
      //   token: "USDC",
      //   flowrate: {
      //     value: 0.666,
      //     unit: "second"
      //   },
      // }
      return {
        mode: "Update",
        _streamType: router.query.streamType as string,
        txData: updateDataSingle,
      };
    } else {
      return {
        mode: "Send",
        _streamType: "Direct",
        txData: {
          receiver: "",
          token: "",
          flowrate: {
            value: 0,
            unit: "second"
          },
        },
      };
    }
  }, [router.query]);

  return (
    <Wrapper>
      <MainContainer>
        <MultiStream {...query} />
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
