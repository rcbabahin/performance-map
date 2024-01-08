import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GraphTHDMulty from "./GraphTHDMulty.js";
import FilterBox from "../FilterBox/FilterBox.js";
import DevicesList from "./DevicesList.js";
import GraphLinesNames from "./GraphLinesNames.js";

import { getMeasurements } from "../../reducers/measurements.js";
import { getDevices } from "../../reducers/devices.js";

function CompareTHD() {
    const [ data, setData ] = useState([]);
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

    }, [dispatch]);
    
    const handleAddDevice = (id) => (e) => {
        
        const { weights } = measurements.find(m => m.id === id)
        const { name } = devices.find(d => d.id === id);

        const idIndex = data.findIndex(item => item.id === id);

        if (idIndex === -1) {
            const items = weights.filter(w => w.THD > 0);

            setData([...data, { items, name, id }])
        } else {
            const dataCopy = [...data];
            dataCopy.splice(idIndex, 1);
            
            setData(dataCopy);
        }        
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
            <GraphTHDMulty data={data} />
        </div>
    );
}

export default CompareTHD;
