import styled from "styled-components";
import { useState } from "react";
import Wrap from "./Wrap";
import Unwrap from "./Unwrap";
import Link from "next/link";

export default function WrapContainer() {
  const [action, setAction] = useState("wrap");

  const selectedStyle = {
    border: "none",
    background: "#5951c3",
  };

  const unselectedStyle = {};

  const renderLogic = () => {
    if (action === "wrap") {
      return <Wrap action={action} />;
    } else if (action === "unwrap") {
      return <Unwrap action={action} />;
    }
  };
  return (
    <Wrapper>
      <Selector>
        <Link
          href={{
            pathname: "/wrap",
            query: { option: "upgrade" },
          }}
        >
          <Option
            style={action === "wrap" ? selectedStyle : unselectedStyle}
            onClick={() => setAction("wrap")}
          >
            <p>Wrap</p>
          </Option>
        </Link>
        <Link
          href={{
            pathname: "/wrap",
            query: { option: "downgrade" },
          }}
        >
          <Option
            style={action === "unwrap" ? selectedStyle : unselectedStyle}
            onClick={() => setAction("unwrap")}
          >
            <p>Unwrap</p>
          </Option>
        </Link>
      </Selector>
      <ModalMain>{renderLogic()}</ModalMain>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 20px;
  background-color: #391e5a;
  box-shadow: rgb(204 204 204 / 55%) 0px 0px 6px 3px;
  border: 2px solid #80b8c2;
  padding: 28px;
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
`;

const Option = styled.div`
  padding: 0 1rem;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 0;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
  }
`;

const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`;
