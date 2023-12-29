import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";


function GraphBassMulty({data}) {
function getColor(name) {
    let hashCode = 0;
        for (let i = 0; i < name.length; i++) {
            hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
        }

        let color = "#";
        for (let i = 0; i < 3; i++) {
            const value = (hashCode >> (i * 8)) & 0xff;
            color += ("00" + value.toString(16)).slice(-2);
        }

        return color;
      }

      function CustomTooltip({ active, payload, label }) {
        
        if (active && payload && payload.length > 0) {
          return (
              <div
              style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #cccccc",
                padding: "8px",
              }}
            >
              <p className="label">
                {`Hz: ${payload[0].payload["Hz"]}`}
                </p>
              <p className="label">
              {`SPL: ${payload[0].payload["SPL"]}`}
                </p>
            </div>
          );
        }
        return null;
      }

    return (
        <div>
            <LineChart 
                width={900} height={450} margin={{ bottom: 30 }} 
                style={{width: '950px', margin: '30px auto'}}
            >
                    {
                        data.map((d, i) => 
                            {   
                                return <Line 
                                        data={d.items} 
                                        name={d.name}
                                        type="monotone" 
                                        dataKey="SPL" 
                                        // stroke="#8884d8"  
                                        stroke={getColor(d.name)}
                                        strokeWidth={2} 
                                        key={i}
                                        // legendType="plainline"
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
                // allowDataOverflow={true}
                    domain={[60, 120]} 
                    label={{ angle: -90, position: 'insideLeft', value: 'SPL, dB', fill: 'black', offset: 10 }}/>
                <Tooltip content={<CustomTooltip />}/>
                <Legend verticalAlign="top" height={36} />
            </LineChart>
        </div>
    );
}

export default GraphBassMulty;

const logAxis = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
]

