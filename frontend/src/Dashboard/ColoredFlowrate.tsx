export default function ColoredFlowrate({ flowrate }: { flowrate: number }) {
    const color = flowrate >= 0 ? "#00ff00" : "#ff9100";
    const signedInflow = flowrate >= 0 ? "+" + flowrate : flowrate;
    return <span style={{ color }}>{signedInflow}</span>;
}