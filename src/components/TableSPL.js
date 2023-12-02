import { useState } from "react";
import { calculateBassSPL, calculateWeightedSPLAndTHD } from "../utils/calculations.js";
import TableHeader from "./TableHeader.js";
import TableRow from "./TableRow.js";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";

function TableSPL({ data, deviceName }) {
    const [ dataKey, setDataKey ] = useState('Z');

    const handleSortByCategory = (c, i) => (e) => {

    }

    const handleEditCellSubmit = (c, i) => (e) => {

    }

    const handleShowGraphData = (wieght) => (e) => {
        setDataKey(wieght);
    }

    const bass = calculateBassSPL(data);
    const averageSPL = bass['0dB'].SPL;
    const cornerFreq = bass['-10dB'].freq;
    const calculatedData = calculateWeightedSPLAndTHD(data, cornerFreq);     
    const categories = Object.keys(calculatedData[0]);
    const categoriesHeader = categories.map(cat => cat === 'freq' ? '1/3 octave [Hz]' : `${cat} [dB]`);
    
    const graphData = calculatedData.map(item => ({ freq: item.freq, Z: item.Z, A: item.A, C: item.C }));
    const rawData = data.map(d => ({ freq: d['Freq[Hz]'], raw: d['CHB[dBSPL]'] }));
    const THDData = calculatedData.map(item => ({ freq: item.freq, THD: item.THD })).filter(item => item.THD > 0);

    const logSum = THDData.reduce((acc, val) => acc + Math.log(val.THD), 0)
    const geoMeanTHD = Math.exp(logSum / THDData.length).toFixed(2);
    const THDPercentages = (Math.pow(10, (geoMeanTHD - bass['Bandwidth SPL']) / 20) * 100).toFixed(2);

    calculatedData.push({ freq: 0, Z: 0, A: 0, C: 'THD %', THD: THDPercentages})

    return (
        <div>
            <span className="table-name">SPL Max </span>
            <div className='xl-table'>
                <TableHeader 
                    categories={categoriesHeader}
                    tableIndex={0}
                    handleSortByCategory={handleSortByCategory}
                />
                <TableRow 
                    data={calculatedData}
                    tableIndex={0}
                    categories={categories} 
                    handleEditCellSubmit={handleEditCellSubmit} 
                />
            </div>

            <div className="graph-device-name">{deviceName.slice(0, -4)}</div>

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

export default TableSPL;

const logAxis = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000
]