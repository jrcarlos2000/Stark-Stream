import { FC } from "react";
import styled from "styled-components";
import { Card, Divider, Typography } from "antd";
import truncateEthAddress from 'truncate-eth-address'

export interface IDetailBreakdownSingle {
    receiver: string,
    token: string,
    flowrate: {
        value: number,
        unit: string
    },
};

interface IReceiver {
    addr: string,
    perc: number
}
export interface IDetailBreakdownMulti {
    receivers: IReceiver[],
    token: string,
    flowrate: {
        value: number,
        unit: string
    },
};

const DetailBreakdown: FC<{ streamType: string, detail: IDetailBreakdownSingle | IDetailBreakdownMulti }> = ({ streamType, detail }) => {

    const receiverCell = () => {
        let receiverAddr = (detail as IDetailBreakdownSingle).receiver;
        receiverAddr = receiverAddr ? truncateEthAddress(receiverAddr) : "-";
        return (
            <tr>
                <Td>Receiver</Td>
                <Td>{receiverAddr}</Td>
            </tr>
        )
    }

    const multiReceiversCell = () => {
        // let receivers = (detail as IDetailBreakdownMulti).receivers;
        // const receiversAddr = receivers.map(recv => recv.addr ? truncateEthAddress(recv.addr) : "-");
        return (detail as IDetailBreakdownMulti).receivers?.map((d: IReceiver, idx: number) => {
            const receiverAddr = d?.addr ? truncateEthAddress(d.addr) : "-";
            const percentage = d?.perc || 0;
            return (<tr key={idx}>
                <Td>Receiver {idx + 1}</Td>
                <Td>{receiverAddr}</Td>
                <Td>{percentage.toFixed(1)}%</Td>
            </tr>)
        }
        )
    }

    return (
        <>
            <Divider />

            <GreenLineContainer>
                <table>
                    <tbody>
                        {(streamType == "Direct") ?
                            receiverCell() : multiReceiversCell()
                        }

                        <tr>
                            <Td>Flow Rate</Td>
                            <Td>{detail.flowrate.value || "-"} {detail.token} / second</Td>
                        </tr>

                        {/* <tr>
                        <Td>Ends on</Td>
                        <Td>{details.endsOn}</Td>
                    </tr> */}
                    </tbody>
                </table>
            </GreenLineContainer>
        </>
    )
}

export default DetailBreakdown;

const GreenLineContainer = styled(Card)`
  border-color: #16659b;
  border-radius: 10px;
  background: #16659b2e;
  color: white;
`;

const Td = styled.td`
    padding-right: 2rem;
`