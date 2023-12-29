import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import GraphBassMulty from "./GraphBassMulty.js";

function Compare() {
    const [ data, setData ] = useState([]);

    const dispatch = useDispatch();

    const devices = useSelector(state => state.devices.devices);
    const measurements = useSelector(state => state.measurements.measurements);

    const handleClick = (id) => (e) => {
        
        const { bass } = measurements.find(m => m.id === id)
        const { name } = devices.find(d => d.id === id);

       const isExist = data.filter(item => item.id === id).length;
       console.log(isExist)

       if (isExist) {
            
       } else {
            const bassGraphData = [
                {Hz: bass['-10dB'].freq, SPL: bass['-10dB'].SPL.toFixed(2)},
                {Hz: bass['-3dB'].freq, SPL: bass['-3dB'].SPL.toFixed(2)},
                {Hz: bass['0dB'].freq, SPL: bass['0dB'].SPL.toFixed(2)},
            ]
            
            setData([...data, { items: bassGraphData, name, id }])
       }

        
    }

    return (
        <div>
            {
                devices.map(device => 
                    <div key={device.id} 
                        onClick={handleClick(device.id)}
                    >
                        {device.name}
                    </div>	
                )
            }
            <GraphBassMulty data={data}/>
        </div>
    );
}

export default Compare;
