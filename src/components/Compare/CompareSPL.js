import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GraphSPLMulty from "./GraphSPLMulty.js";
import FilterBox from "../FilterBox/FilterBox.js";
import DevicesList from "./DevicesList.js";
import GraphLinesNames from "./GraphLinesNames.js";

import { getMeasurements } from "../../reducers/measurements.js";
import { getDevices } from "../../reducers/devices.js";

function CompareSPL() {
    const [ data, setData ] = useState([]);
    const [ dataKey, setDataKey ] = useState('Z');
    const [ currentCompany, setCurrentCompany ] = useState('All');

    const dispatch = useDispatch();

    const devicesStatus = useSelector(state => state.devices.status);
    const measurementsStatus = useSelector(state => state.measurements.status);

    const devices = useSelector(state => state.devices.devices);
    const measurements = useSelector(state => state.measurements.measurements);

    const companies = ['All', ...useSelector(state => state.devices.companies)];

    useEffect(() => {
        if (devicesStatus === 'idle') {
            dispatch(getDevices());
        }

        if (measurementsStatus === 'idle') {
            dispatch(getMeasurements());
        }

    }, []);
    
    const handleAddDevice = (id) => (e) => {

        const { weights } = measurements.find(m => m.id === id)
        const { name } = devices.find(d => d.id === id);

        const idIndex = data.findIndex(item => item.id === id);

        if (idIndex === -1) {
            setData([...data, { items: weights, name, id }])
        } else {
            const dataCopy = [...data];
            dataCopy.splice(idIndex, 1);
            
            setData(dataCopy);
        }    
    }

    const handleShowGraphData = (e) => {
        
        const innerText = e.target.innerText;
        const weight = innerText[0];

        setDataKey(weight);
    }

    const handleFilterClick = (e) => {

		const innerText = e.target.innerText;

        setCurrentCompany(innerText);
	}

    if (devicesStatus === 'loading' || measurementsStatus === 'loading') {
        return <div className='loading'/>
    } else if (devicesStatus === 'failed' || measurementsStatus === 'failed') {
        return <div className="something-went-wrong">Downloading failed ಠ﹏ಠ</div>
    }

    const filteredDevices = devices.filter(d => {
        if (currentCompany === 'All') {
            return true;
        } else {
            return d.company === currentCompany;
        }
    });

    return (
        <div>
            <FilterBox 
                data={[
                    'Z-weightened',
                    'A-weightened',
                    'C-weightened'
                ]}
                filter={`${dataKey}-weightened`}
                handleClick={handleShowGraphData}
                className="filter-box"
            />
            <FilterBox 
                data={companies}
                filter={currentCompany}
                handleClick={handleFilterClick}
                className="filter-box"
            />
            <DevicesList 
                allDevices={filteredDevices}
                selectedDevices={data}
                handleAddDevice={handleAddDevice}
            />
            <GraphLinesNames selectedDevices={data} />
            <GraphSPLMulty data={data} dataKey={dataKey} />
        </div>
    );
}

export default CompareSPL;