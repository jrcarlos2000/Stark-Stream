import styled from "styled-components";
import { Space, Row, Col, Input, DatePicker, Button, Card, Form, Segmented, Select, InputNumber, notification } from "antd";
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import TokenSelector from "./TokenSelector";
import FlowrateEditor from "./FlowrateEditor";
import DetailBreakdown, { IDetailBreakdownMulti, IDetailBreakdownSingle } from "./DetailBreakdown";
import { SEC } from "../constants";
import { usemBTCContract,useUSDTContract, usemDAIContract, usemUSDTContract } from "../hooks/TokenContracts";
import Link from "next/link";
import { useStarknet, useStarknetInvoke, useStarknetTransactionManager } from "@starknet-react/core";
import { parseEther } from "ethers/lib/utils";
import { bnToUint256 } from "starknet/dist/utils/uint256";
import { toBN } from "starknet/dist/utils/number";
///////
// token selector
const { Option } = Select;
const timeInSeconds : any = {
  'second' : 1,
  'min' : 60,
  'hour' : 3600,
  'day' : 86400,
  'month' : 2592000
};
const tokenList: String[] = ["mDAI", "mUSDT", "mBTC"]
// flowrate editor
interface IFlowrateUnit {
  display: string,
  scale: number
};

const flowrateUnits: Record<string, number> = {
  "second": SEC,
  "min": 60 * SEC,
  "hour": 3600 * SEC,
  "day": 86400 * SEC,
  "month": 30 * 86400 * SEC,
}
////////

const selectDropdownStyle = {
  background: "#2d1857",
  color: "#bfbfbf"
}


const StreamingCard: FC<{ mode: string, _streamType: string, txData: IDetailBreakdownSingle | IDetailBreakdownMulti | {} }> = ({ mode, _streamType, txData }) => {

  const [streamType, setStreamType] = useState<string>(_streamType || "Direct");
  const [detailData, setDetailData] = useState<any>();
  const {connectors} = useStarknet();
  const {transactions} = useStarknetTransactionManager();
  const {contract : cmBTC} = usemBTCContract();
  const {contract : cmDAI} = usemDAIContract();
  const {contract : cmUSDT} = usemUSDTContract();
  const {invoke : callStartStream} = useStarknetInvoke({
    contract : cmUSDT,
    method : 'start_stream'
  })

  const contracts : any = {
    'mUSDT' : cmUSDT,
    'mBTC' : cmBTC,
    'mDAI' : cmDAI 
  }

  useEffect(() => setStreamType(_streamType), [_streamType])

  const disableEdit = mode == "Update";

  const updateDetailData = (changedVal: any, allVal: any) => {
    console.log("test fields: ", form.getFieldValue(["receivers"]))
    if (allVal.token)
      setDetailData(allVal);
    else
      setDetailData(null);
    console.log("test all data ", allVal)
  }

  console.log(transactions);

  const handleSubmit = async (values: any) => {
    const Account = await connectors[0].account();
    const UnitsPerSecond = parseEther(values.flowrate.value).div(timeInSeconds[values.flowrate.unit])//format if unit is more than second
    const parsedDeposit = parseEther('1');
    // await Account.execute([
    //   {
    //     contractAddress: contracts[values.token] ? contracts[values.token].address : '',
    //     entrypoint: 'start_stream',
    //     calldata: [values.receiver,UnitsPerSecond.toString(),'0',parsedDeposit.toString(),'0'],
    //   }
    // ])
    await callStartStream({
      args : [values.receiver, bnToUint256(UnitsPerSecond.toString()), bnToUint256(parsedDeposit.toString())]
    })
    notification.open({
      message: 'Transaction Submitted',
      description:
      <a target="_blank" href="https://google.com" >Open transaction in explorer.</a>,
    });
  }

  const [form] = Form.useForm();
  //   form.setFields([{
  //     }]);

  return (
    <PurpleContainer>
      <Space direction="vertical" size="large">

        <WhiteTitle>{mode}</WhiteTitle>


        <StyledSegmented block disabled={disableEdit} options={["Direct", "Distribution"]} value={streamType} onChange={setStreamType} />

        <Form form={form} name="dynamic_form_item" size="large" style={{ width: "100%" }} onFinish={handleSubmit}
          onValuesChange={updateDetailData}
          onFieldsChange={console.log}
          initialValues={txData}
        >

          {streamType == "Direct" ?
            <>
              {/* single receiver: direct */}
              <Form.Item name="receiver">
                <StyledInput
                  style={{ backgroundColor: "#2d1857"}}
                  disabled={disableEdit}
                  allowClear
                  placeholder="Receiving Address"
                  // prefix={
                  //   <InboxOutlined />
                  // }
                />
              </Form.Item>
            </>
            :
            <>
              {/* multiple receivers: distribution, https://ant.design/components/form/#components-form-demo-dynamic-form-items */}
              < Form.List
                name="receivers"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error('At least 2 receivers'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8, }} align="center">
                        <Form.Item
                          required={false}
                          name={[name, 'addr']}
                        >
                          <StyledInput
                          style={{ backgroundColor: "#2d1857"}}
                            disabled={disableEdit}
                            allowClear
                            placeholder="Receiving Address"
                            prefix={
                              <InboxOutlined />
                            }
                          />
                        </Form.Item>

                        <Form.Item name={[name, 'perc']} style={{ width: "6.5rem" }}>
                          <StyledInputNumber max={100} min={0} addonAfter="%" />
                        </Form.Item>

                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            color="white"
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item>
                      <AddButton
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add receiver
                      </AddButton>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </>
          }
          {/* TokenSelector and Flowrate */}
          <Form.Item style={{ display: "inline-block" }}>
            {/* TokenSelector */}
            <Form.Item name="token">
              <StyledSelect
                disabled={disableEdit}
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search Token"
                optionFilterProp="children"
                dropdownStyle={selectDropdownStyle}
              >
                {tokenList.map((token, idx) =>
                  <Option key={idx} value={token}>{token}</Option>
                )}
              </StyledSelect>
            </Form.Item>

            {/* Flowrate */}
            <Input.Group compact>
              <Form.Item name={['flowrate', 'value']}>
                <NumberInput placeholder="Flow Rate" type="number" />
              </Form.Item>
              <Form.Item name={['flowrate', 'unit']}>
                <StyledSelect style={{ width: 120 }} dropdownStyle={selectDropdownStyle}>
                  {Object.keys(flowrateUnits).map(unit =>
                    <Option key={unit} value={unit}>/ {unit}</Option>
                  )}
                </StyledSelect>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>

        </Form>

      </Space>

      {
        detailData &&
        <DetailBreakdown streamType={streamType} detail={detailData} />
      }

    </PurpleContainer >
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

const NumberInput = styled(Input)`
  width: 5rem;
  background: #2d1857;
  color: #bfbfbf;
`;

const StyledSegmented = styled(Segmented)`
.ant-segmented-item-disabled > .ant-segmented-item-label {
  color: black
}

.ant-segmented-item-selected, [class^="ant-segmented-thumb"] {
  background: rgb(89, 81, 195);

}
.ant-segmented-item-label {
    // padding: 0 1rem;
    color: #fff;
    // font-size: 1.3rem;
    font-weight: 500;
    // line-height: 0;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
    }
  }
`

const StyledInput = styled(Input)`
  input {
    background-color: #2d1857;
    color: #bfbfbf;
  }
  .ant-input {
    color: #bfbfbf;
  }
  .ant-input-affix-wrapper.ant-input-affix-wrapper-lg {
    background: black;
  }
  .ant-input-affix-wrapper {
    box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px!important;
    border: none!important;
  }
`;

const StyledInputNumber = styled(InputNumber)`
    color: #bfbfbf;
  .ant-input-number-lg {
    background: #2d1857;
  }
  .ant-input-number-group-addon {
    background-color: #7923e2;
    color: white;
  }
`;

const StyledSelect = styled(Select)`
  span {
    color: #bfbfbf;
  }
  .ant-select-selector, .ant-select-selection {
    background: #2d1857!important;
  }

  .ant-select-item-option-content {
    color: white!important;
  }
`;

const AddButton = styled(Button)`
  background: #7923e2;
  color: white;
  .ant-btn-dashed:hover, .ant-btn-dashed:focus {
    opacity: 0.3;
    background-color: #7923e2!important;
  }
`;