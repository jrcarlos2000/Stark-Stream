import styled from "styled-components";
import { Space, Row, Col, Input, DatePicker, Button, Card, Segmented } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { createContext, FC, useMemo, useState } from "react";
import TokenSelector from "./TokenSelector";
import FlowrateEditor from "./FlowrateEditor";
import DetailBreakdown, { IDetailBreakdownSingle } from "./DetailBreakdown";

export interface ITxData {
  receiver: string,
  token: string,
  flowrate: number,
  endsOn: number,
}


const StreamingCard: FC<{ mode: string, txData: ITxData | null }> = ({ mode, txData }) => {
  const [receiver, setReceiver] = useState<string>(txData?.receiver || "");
  const [token, setToken] = useState<string>(txData?.token || "");
  const [flowrate, setFlowrate] = useState<number>(txData?.flowrate || "");
  // const [endsOn, setEndsOn] = useState<number>(txData?.endsOn || 0);

  const disableEdit = mode == "Update";

  const handleSubmit = () => {
    console.log(mode, receiver, token, flowrate);
  }

  const detailData = useMemo(() => {
    console.log("detaildata, ", detailData == null)
    if (token && receiver)
      return {
        receiver,
        token,
        flowrate
      };
    return null;
  }, [receiver, token, flowrate])

  return (
    <PurpleContainer>
      <Space direction="vertical" size="large">

        <WhiteTitle>{mode}</WhiteTitle>

        <Row>
          <Input
            disabled={disableEdit}
            value={receiver}
            onChange={e => setReceiver(e.target.value)}
            allowClear
            placeholder="Receiving Address"
            prefix={
              <InboxOutlined />
            }
          />
        </Row>

        <Row>
          <Space direction="horizontal" size="middle">
            <Col span={6}>
              <TokenSelector token={token} setToken={setToken} disabled={disableEdit} />
            </Col>

            <Col span={18}>
              <FlowrateEditor flowrate={flowrate} setFlowrate={setFlowrate} />
            </Col>
          </Space>
        </Row>

        {/* <Row>
            <Space direction="horizontal">
              <DatePicker showTime placeholder="Ends on" />

              <span>1.234</span>
            </Space>
          </Row> */}

        <Button disabled={detailData == null} type="primary" shape="round" block onClick={handleSubmit}>
          {mode}
        </Button>
      </Space>

      {detailData &&
        <DetailBreakdown detail={detailData} />
      }

    </PurpleContainer>
  );
}

export default StreamingCard;

const PurpleContainer = styled(Card)`
  background-color: #391E5A;
  border-radius: 20px;
  box-shadow: rgb(204 204 204 / 55%) 0px 0px 6px 3px;
  border: 2px solid #80b8c2;
  // padding: 28px;
`;

const WhiteTitle = styled.h4`
  color: white;
`;