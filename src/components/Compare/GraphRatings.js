import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Rectangle } from "recharts";

function GraphRatings({ data }) {
    const { average, items, header } = data;

    if (!items.length) return;

    const yMaxValue = Math.ceil(average * 1.2);

    return (    
        <div className="graph-ratings">
            <header>{header}</header>
            <BarChart 
                data={items}
                width={900} height={450} margin={{ bottom: 30 }} 
                style={{width: '950px', margin: '30px auto'}}>
                <Bar dataKey={`${Object.keys(items[0])[1]}`} fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="blue" />} />
                <ReferenceLine 
                    y={average} 
                    label={{position: {x: 60, y: -10}, value: average.toFixed(2) , fill: 'black'}} 
                    stroke="green" 
                    strokeWidth={10}
                    opacity={0.5}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  />
                <XAxis 

                    dataKey="name"
                    // ticks={logAxis} 
                    // interval={0} 
                    // type="number" 
                    // domain={[10,20000]} 
                    // dataKey="freq" 
                    // scale="log" 
                    // tickSize='12' 
                    // angle='45' 
                    // label={{ position: 'insideTop', value: 'Frequency, Hz', fill: 'black', offset: 40 }}
                    />
                <YAxis 
                    domain={[0, yMaxValue]} 
                    // label={{ angle: -90, position: 'insideLeft', value: 'SPL, dB', fill: 'black', offset: 10 }}
                    />
                <Tooltip />
                <Legend />
            </BarChart>
        </div>
    );
}

export default GraphRatings;
