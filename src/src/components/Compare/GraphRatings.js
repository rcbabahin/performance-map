import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Rectangle } from "recharts";

function GraphRatings({ data }) {
    const { average, items, header } = data;

    if (!items.length) return;

    const keyName = Object.keys(items[0])[1];
    const maxValue = Math.max(...items.map(item => item[keyName]));
    const yMaxValue = Math.ceil(maxValue * 1.2);

    return (    
        <div className="graph-ratings">
            <header>{header}</header>
            <BarChart 
                data={items}
                width={900} height={450} margin={{ bottom: 30 }} 
                style={{width: '950px', margin: '30px auto'}}>
                <Bar dataKey={keyName} fill="#82ca9d" activeBar={{ stroke: 'black', strokeWidth: 2 }} barSize={25} />
                <ReferenceLine 
                    y={average} 
                    label={{position: {x: 60, y: -10}, value: Number(average.toFixed(2)) , fill: 'black'}} 
                    stroke="#6495ed" 
                    strokeWidth={10}
                    opacity={0.5}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  />
                
                <XAxis dataKey="name" />
                <YAxis 
                    domain={[0, yMaxValue]} 
                    // label={{ angle: -90, position: 'insideLeft', value: 'SPL, dB', fill: 'black', offset: 10 }}
                    />
                <Tooltip 
                    cursor={{ fill: 'rgba(206, 206, 206, 0.2)', width: 0}}
                />
                <Legend />
            </BarChart>
        </div>
    );
}

export default GraphRatings;
