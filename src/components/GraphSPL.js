import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";

function GraphSPL({ graphData, rawData, name, THDData, averageSPL }) {
    const [ dataKey, setDataKey ] = useState('Z');

    const handleShowGraphData = (wieght) => (e) => {
        setDataKey(wieght);
    }
    return (
        <div>
            <div className="graph-device-name">{name}</div>

            <div className="graph-type">
                <div className='choose-table-type'>
                    <div onClick={handleShowGraphData('Z')} className={`choose-table-type-item ${dataKey === 'Z' ? 'active' : ''}`}> Show Z-weightened</div>
                    <div onClick={handleShowGraphData('A')} className={`choose-table-type-item ${dataKey === 'A' ? 'active' : ''}`}> Show A-weightened</div>
                    <div onClick={handleShowGraphData('C')} className={`choose-table-type-item ${dataKey === 'C' ? 'active' : ''}`}> Show C-weightened</div>
                    <div onClick={handleShowGraphData('raw')} className={`choose-table-type-item ${dataKey === 'raw' ? 'active' : ''}`}> Show Raw</div>
                </div>
            </div>

            <LineChart 
                width={900} height={450} margin={{ bottom: 30 }} 
                style={{width: '950px', margin: '30px auto'}}>
                <Line 
                    data={dataKey === 'raw' ? rawData : graphData} 
                    type="monotone" 
                    dataKey={dataKey} 
                    stroke="#8884d8"  
                    strokeWidth={2} 
                    dot={dataKey !== 'raw'}/>
                <Line 
                    data={THDData} 
                    type="monotone" 
                    dataKey="THD" 
                    stroke="#3498db"  
                    strokeWidth={2} />
                <ReferenceLine 
                    y={averageSPL} 
                    label={{position: 'insideBottomLeft', value: averageSPL.toFixed(2) , fill: 'black'}} 
                    stroke="green" />
                <ReferenceLine 
                    y={averageSPL + 6} 
                    label={{position: 'insideBottomLeft', value: (averageSPL + 6).toFixed(2)}}
                    stroke="green" 
                    strokeDasharray="10 10" 
                    strokeWidth={2}/>
                <ReferenceLine 
                    y={averageSPL - 6}
                    label={{position: 'insideBottomLeft', value: (averageSPL - 6).toFixed(2)}}
                    stroke="green"
                    strokeDasharray="10 10"
                    strokeWidth={2}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  />
                <XAxis 
                    ticks={logAxis} 
                    interval={0} 
                    type="number" 
                    domain={[10,20000]} 
                    dataKey="freq" 
                    scale="log" 
                    tickSize='12' 
                    angle='45' 
                    label={{ position: 'insideTop', value: 'Frequency, Hz', fill: 'black', offset: 40 }}/>
                <YAxis 
                    domain={[0, 120]} 
                    label={{ angle: -90, position: 'insideLeft', value: 'SPL, dB', fill: 'black', offset: 10 }}/>
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
            </LineChart>
        </div>
    );
}

export default GraphSPL;

const logAxis = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000
]