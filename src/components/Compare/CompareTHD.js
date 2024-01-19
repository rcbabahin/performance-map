import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GraphTHDMulty from "./GraphTHDMulty.js";
import FilterBox from "../FilterBox/FilterBox.js";
import DevicesList from "./DevicesList.js";
import GraphLinesNames from "./GraphLinesNames.js";

import { 
    getMeasurements, 
    selectMeasurementsStatus, 
    selectMeasurements 
} from "../../reducers/measurements.js";
import { 
    getDevices, 
    selectCompanies, 
    selectDevicesStatus, 
    selectDevices 
} from "../../reducers/devices.js";
import { 
    handleActiveDevice,
    setCompany,
    selectFilteredDevices,
    selectTHDGraphData,
    selectCurrentCompany
 } from "../../reducers/compare.js";

function CompareTHD() {
    const dispatch = useDispatch();

    const devicesStatus = useSelector(selectDevicesStatus);
    const measurementsStatus = useSelector(selectMeasurementsStatus);

    const devices = useSelector(selectDevices);
    const measurements = useSelector(selectMeasurements);

    const companies = useSelector(selectCompanies);

    const filteredDevices = useSelector(selectFilteredDevices);
    const thdData = useSelector(selectTHDGraphData);
    const currentCompany = useSelector(selectCurrentCompany);

    useEffect(() => {
        if (devicesStatus === 'idle') {
            dispatch(getDevices());
        }

        if (measurementsStatus === 'idle') {
            dispatch(getMeasurements());
        }

        dispatch(setCompany({ devices, company: 'All' }));
    }, [devices]);
    
    const handleAddDevice = (id) => (e) => {
        
        const { name } = devices.find(d => d.id === id);

        dispatch(handleActiveDevice({ id, measurements, name }));
    }

    const handleFilterClick = (e) => {

		const innerText = e.target.innerText;

        dispatch(setCompany({ devices, company: innerText }));
	}

    if (devicesStatus === 'loading' || measurementsStatus === 'loading') {
        return <div className='loading'/>
    } else if (devicesStatus === 'failed' || measurementsStatus === 'failed') {
        return <div className="something-went-wrong">Downloading failed ಠ﹏ಠ</div>
    }

    return (
        <div>
            <h1 className="compare-header">Total Harmonic Distortion</h1>
            <FilterBox 
                data={companies}
                filter={currentCompany}
                handleClick={handleFilterClick}
                className="filter-box"
            />
            <DevicesList 
                allDevices={filteredDevices}
                selectedDevices={thdData}
                handleClick={handleAddDevice}
            />
            <GraphLinesNames selectedDevices={thdData} />
            <GraphTHDMulty data={thdData} />
        </div>
    );
}

export default CompareTHD;
