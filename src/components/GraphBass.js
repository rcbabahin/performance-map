import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";

function GraphBass({ graphData, averageSPL }) {
    return (
        <div>
            <LineChart 
                width={900} height={400} margin={{ bottom: 30 }} 
                data={graphData} style={{width: '950px', margin: '50px auto'}}>
                <Line type="monotone" dataKey="SPL" stroke="#8884d8" strokeWidth={2}/>
                <ReferenceLine 
                    y={averageSPL} 
                    label={{position: 'insideBottomLeft', value: averageSPL.toFixed(2) , fill: 'black'}} 
                    stroke="green" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  />
                <XAxis 
                    ticks={logAxis} 
                    interval={0} 
                    type="number" 
                    domain={[10,1000]}
                    dataKey="Hz" 
                    scale="log" 
                    tickSize='12' 
                    angle='45' 
                    label={{ position: 'insideTop', value: 'Frequency, Hz', fill: 'black', offset: 40 }}/>
                <YAxis 
                domain={[60, 120]}
                label={{ angle: -90, position: 'insideLeft', value: 'SPL, dB', fill: 'black', offset: 10 }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
            </LineChart> 
        </div>
    );
}

export default GraphBass;

const logAxis = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 
]