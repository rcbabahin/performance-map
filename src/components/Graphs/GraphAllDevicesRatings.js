import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Cell } from "recharts";

import { companyColors } from '../../utils/utils.js'

function GraphAllDevicesRatings({ data }) {
    const { average, items } = data;

    if (!items.length) return;

    const keyName = Object.keys(items[0])[1];

    let maxValue = Math.max(...items.map(item => item[keyName]));
    maxValue = average > maxValue ? average : maxValue;

    const yMaxValue = Math.ceil(maxValue * 1.2);

    return (    
        <div className="all-devices-graph">
            <header>{keyName}</header>
            <BarChart 
                data={items}
                width={1400} height={600} 
            >
                <Bar 
                    dataKey={keyName} 
                    fill="#82ca9d" 
                    activeBar={{ stroke: 'black', strokeWidth: 2 }} 
                    barSize={25}
                >
                    {
                        items.map((item, index) => (
                            <Cell key={`cell-${index}`} fill={companyColors[item.company]} />
                        ))
                    }
                </Bar>
                <ReferenceLine 
                    y={average} 
                    label={{position: {x: 60, y: -10}, value: Number(average.toFixed(2)) , fill: 'black'}} 
                    stroke="#6495ed" 
                    strokeWidth={10}
                    opacity={0.5}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  />
                <XAxis dataKey="name" 
                    label={{ position: {x: 700, y: 50}, value: keyName, fill: 'black' }}
                />
                <YAxis domain={[0, yMaxValue]} />
                <Tooltip cursor={{ fill: 'rgba(206, 206, 206, 0.2)', width: 0}} />
            </BarChart>
        </div>
    );
}

export default GraphAllDevicesRatings;
