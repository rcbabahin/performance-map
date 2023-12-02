import { calculateBassSPL } from "../utils/calculations.js";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";

function TableBass({ data }) {
    const bass = calculateBassSPL(data);
    const bassGraphData = [
        {Hz: bass['-10dB'].freq, SPL: bass['-10dB'].SPL.toFixed(2)},
        {Hz: bass['-3dB'].freq, SPL: bass['-3dB'].SPL.toFixed(2)},
        {Hz: bass['0dB'].freq, SPL: bass['0dB'].SPL.toFixed(2)},
        // {Hz: 20000, SPL: bass['0dB'].SPL.toFixed(2)},
    ]
    
    const tableHeader = ['-10dB [Hz]', '-3dB [Hz]', '0dB [Hz]', 'Bandwidth SPL [dB]'];
    const tableRow = [bass['-10dB'].freq, bass['-3dB'].freq, bass['0dB'].freq, bass['Bandwidth SPL'].toFixed(2)];

    return (
        <div>
            <span className="table-name">Corner Frequncies</span>
            <div className="table-bass">
                <div className="table-bass-header-item"></div>
                { tableHeader.map((item) => 
                    <div key={item} className="table-bass-header-item" >
                        {item}
                    </div>	
                )}
    
                <div>20 Hz - 20 kHz</div>

                { tableHeader.map((item, index) => {
                    if(index === tableHeader.length - 1) return <div key={index}>{bass['0dB'].SPL.toFixed(2)}</div>	
                    else return <div key={index}></div>	
                })}

                <div>{`${bass['-10dB'].freq} Hz`} - 20 kHz</div>

                { tableRow.map((item, index) => 
                    <div key={`${item}${index}`} >
                        {item}
                    </div>	
                )}
            </div>

            <LineChart 
                width={900} height={400} margin={{ bottom: 30 }} 
                data={bassGraphData} style={{width: '950px', margin: '50px auto'}}>
                <Line type="monotone" dataKey="SPL" stroke="#8884d8" strokeWidth={2}/>
                <ReferenceLine 
                    y={bass['0dB'].SPL} 
                    label={{position: 'insideBottomLeft', value: bass['0dB'].SPL.toFixed(2) , fill: 'black'}} 
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

export default TableBass;

const logAxis = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 
]
