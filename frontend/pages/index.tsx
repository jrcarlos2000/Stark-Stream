import type { NextPage } from "next";
import DashboardTable from "../src/Dashboard/DashboardTable";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <DashboardTable />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
`;
