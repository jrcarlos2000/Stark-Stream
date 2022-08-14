import { FC, useContext, useState } from "react";
import { Row, Select, Input, Col } from "antd";
import { useEffect } from "react";
import { SEC } from "../constants";

const { Option } = Select;

interface IFlowrateUnit {
    display: string,
    scale: number
};

const flowrateUnits: Record<string, IFlowrateUnit> = {
    "s": {
        display: "/ second",
        scale: SEC
    },
    "m": {
        display: "/ min",
        scale: 60 * SEC
    },
    "h": {
        display: "/ hour",
        scale: 3600 * SEC
    },
    "d": {
        display: "/ day",
        scale: 86400 * SEC
    },
    "M": {
        display: "/ month",
        scale: 30 * 86400 * SEC
    }
}

interface IFlowrateEditor {
    flowrate: number,
    setFlowrate: (arg0: number) => void,
}
const FlowrateEditor: FC<IFlowrateEditor> = ({ flowrate, setFlowrate }) => {
    const [value, setValue] = useState(flowrate);
    const [unit, setUnit] = useState('s');

    // calculate flowrate per sec
    // update the flowrate in context 
    useEffect(() => {
        const flowrateInSec = value / flowrateUnits[unit].scale;
        setFlowrate(isNaN(flowrateInSec) ? 0 : flowrateInSec);
    }, [unit, value]);


    return (
        <Row>
            <Col span={16}>
                <Input placeholder="Flow Rate" type="number" value={value} onInput={e => setValue(Number.parseFloat(e.target.value))} />
            </Col>
            <Col span={8}>
                <Select defaultValue="s" style={{ width: 120 }} onChange={setUnit}>
                    {Object.keys(flowrateUnits).map(key =>
                        <Option key={key} value={key}>{flowrateUnits[key].display}</Option>
                    )}
                </Select>
            </Col>
        </Row>
    )
}

export default FlowrateEditor;