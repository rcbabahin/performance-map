import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GraphSPLMulty from "./GraphSPLMulty.js";
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
    selectDevices,
    selectSizeCategoriesArray
} from "../../reducers/devices.js";
import { 
    selectSPLGraphData, 
    selectSPLWeight,
    handleActiveDevice, 
    selectCurrentCompany, 
    selectCurrentCategory,
    selectFilteredDevices, 
    setFilteredDevices,
    setSPLWeight
} from "../../reducers/compare.js";

function CompareSPL() {
    const dispatch = useDispatch();

    const devicesStatus = useSelector(selectDevicesStatus);
    const measurementsStatus = useSelector(selectMeasurementsStatus);

    const devices = useSelector(selectDevices);
    const measurements = useSelector(selectMeasurements);

    const companies = useSelector(selectCompanies);
    const categories = useSelector(selectSizeCategoriesArray);

    const filteredDevices = useSelector(selectFilteredDevices);
    const splData = useSelector(selectSPLGraphData);
    const splWeight = useSelector(selectSPLWeight);
    const currentCompany = useSelector(selectCurrentCompany);
    const currentCategory = useSelector(selectCurrentCategory);

    useEffect(() => {
        if (devicesStatus === 'idle') {
            dispatch(getDevices());
        }

        if (measurementsStatus === 'idle') {
            dispatch(getMeasurements());
        }

        dispatch(setFilteredDevices({ devices, company: 'All', category: 'All' }));
    }, [devices]);

    const handleAddDevice = (id) => (e) => {

        const { name } = devices.find(d => d.id === id);

        dispatch(handleActiveDevice({ id, measurements, name }));
    }

    const handleFilterClick = (type) => (e) => {
        
		const innerText = e.target.innerText;

        if (type === 'company') {
            dispatch(setFilteredDevices({ devices, company: innerText, category: currentCategory}));
        }
        else if (type === 'category') {
            dispatch(setFilteredDevices({ devices, company: currentCompany, category: innerText}));
        }
	}

    // const handleShowGraphData = (e) => {
        
    //     const innerText = e.target.innerText;
    //     const weight = innerText[0];

    //     dispatch(setSPLWeight({ weight }));
    // }

    if (devicesStatus === 'loading' || measurementsStatus === 'loading') {
        return <div className='loading'/>
    } else if (devicesStatus === 'failed' || measurementsStatus === 'failed') {
        return <div className="something-went-wrong">Downloading failed ಠ﹏ಠ</div>
    }

    return (
        <div>
            <h1 className="compare-header">Sound Pressure Level</h1>
            {/* <FilterBox 
                data={[
                    'Z-weightened',
                    'A-weightened',
                    'C-weightened'
                ]}
                filter={`${splWeight}-weightened`}
                handleClick={handleShowGraphData}
                className="filter-box"
            /> */}
            <FilterBox 
                data={companies}
                filter={currentCompany}
                handleClick={handleFilterClick('company')}
                className="filter-box"
            />
            <FilterBox 
                data={categories}
                filter={currentCategory}
                handleClick={handleFilterClick('category')}
                className="filter-box"
            />
            <DevicesList 
                allDevices={filteredDevices}
                selectedDevices={splData}
                handleClick={handleAddDevice}
            />
            <GraphLinesNames selectedDevices={splData} />
            <GraphSPLMulty data={splData} dataKey={splWeight} />
        </div>
    );
}

export default CompareSPL;
