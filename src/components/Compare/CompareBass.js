import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GraphBassMulty from "./GraphBassMulty.js";
import FilterBox from "../FilterBox/FilterBox.js";
import DevicesList from "./DevicesList.js";
import GraphLinesNames from "./GraphLinesNames.js";

import { getMeasurements } from "../../reducers/measurements.js";
import { getDevices } from "../../reducers/devices.js";

function CompareBass() {
    const [ bassData, setBassData ] = useState([]);
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
        
        const { bass } = measurements.find(m => m.id === id)
        const { name } = devices.find(d => d.id === id);

        const idIndex = bassData.findIndex(item => item.id === id);

        if (idIndex === -1) {
            const bassGraphData = [
                {Hz: bass['-10dB'].freq, SPL: bass['-10dB'].SPL.toFixed(2)},
                {Hz: bass['-3dB'].freq, SPL: bass['-3dB'].SPL.toFixed(2)},
                {Hz: bass['0dB'].freq, SPL: bass['0dB'].SPL.toFixed(2)},
            ]
            
            setBassData([...bassData, { items: bassGraphData, name, id }])
        } else {
            const dataCopy = [...bassData];
            dataCopy.splice(idIndex, 1);
            
            setBassData([...dataCopy]);
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
            <h1 className="compare-header">Bass</h1>
            <FilterBox 
                data={companies}
                filter={currentCompany}
                handleClick={handleFilterClick}
                className="filter-box"
            />
            <DevicesList 
                allDevices={filteredDevices}
                selectedDevices={bassData}
                handleAddDevice={handleAddDevice}
            />
            <GraphLinesNames selectedDevices={bassData} />
            <GraphBassMulty data={bassData}/>
        </div>
    );
}

export default CompareBass;
