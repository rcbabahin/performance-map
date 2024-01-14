import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import CustomTooltip from "./CustomTooltip.js";

import { getColor } from "../../utils/utils.js";

function GraphBassMulty({data}) {

    return (
        <div className="compare-graph-multiple">
            <ResponsiveContainer minHeight={600}>
                <LineChart margin={{ bottom: 30, top: 30 }} >
                    {
                        data.map((d, i) => 
                            {   
                                return <Line 
                                        data={d.items} 
                                        name={d.name}
                                        type="monotone" 
                                        dataKey="SPL" 
                                        stroke={getColor(d.name)}
                                        strokeWidth={2} 
                                        key={i}
                                        activeDot={false} 
                                        />   
                            } 
                        )
                    }
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
                        label={{ angle: -90, position: 'insideLeft', value: 'SPL, dB', fill: 'black', offset: 10 }}/>
                    <Tooltip content={<CustomTooltip XAxisDataKey='Hz' YAxisDataKey='SPL' />}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraphBassMulty;

const logAxis = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    100, 200, 300, 400, 500, 600, 700, 800, 900
]

