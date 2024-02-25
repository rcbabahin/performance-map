import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GraphBassMulty from "./GraphBassMulty.js";
import GraphSPLMulty from "./GraphSPLMulty.js";
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
    selectDevices,
    selectSizeCategoriesArray
} from "../../reducers/devices.js";
import { 
    handleActiveDevice, 
    selectBassGraphData, 
    selectTHDGraphData,
    selectSPLGraphData,
    selectSPLWeight,
    selectCurrentCompany, 
    selectCurrentCategory,
    selectFilteredDevices, 
    setFilteredDevices,
    selectCurrentGraph,
    setActiveGraph
} from "../../reducers/compare.js";
import CompareHeaderItem from "./CompareHeaderItem.js";

function Compare() {
    const dispatch = useDispatch();

    const devicesStatus = useSelector(selectDevicesStatus);
    const measurementsStatus = useSelector(selectMeasurementsStatus);

    const devices = useSelector(selectDevices);
    const measurements = useSelector(selectMeasurements);

    const companies = useSelector(selectCompanies);
    const categories = useSelector(selectSizeCategoriesArray);

    const filteredDevices = useSelector(selectFilteredDevices);
    const bassData = useSelector(selectBassGraphData);
    const thdData = useSelector(selectTHDGraphData);
    const splData = useSelector(selectSPLGraphData);
    const splWeight = useSelector(selectSPLWeight);

    const currentCompany = useSelector(selectCurrentCompany);
    const currentCategory = useSelector(selectCurrentCategory);
    const currentGraph = useSelector(selectCurrentGraph);

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

    const handleActiveGraph = (e) => {

		const innerText = e.target.innerText.toLowerCase();

        dispatch(setActiveGraph({ graph: innerText }));
	}

    if (devicesStatus === 'loading' || measurementsStatus === 'loading') {
        return <div className='loading'/>
    } else if (devicesStatus === 'failed' || measurementsStatus === 'failed') {
        return <div className="something-went-wrong">Downloading failed ಠ﹏ಠ</div>
    }

    let contentGraph, contentGraphNames;

    if (currentGraph === 'bass') {
        contentGraph = <GraphBassMulty data={bassData}/>
        contentGraphNames = <GraphLinesNames selectedDevices={bassData} />
    }
    else if (currentGraph === 'spl') {
        contentGraph = <GraphSPLMulty data={splData} dataKey={splWeight} />
        contentGraphNames = <GraphLinesNames selectedDevices={splData} />
    }
    else if (currentGraph === 'thd') {
        contentGraph = <GraphTHDMulty data={thdData} />
        contentGraphNames = <GraphLinesNames selectedDevices={thdData} />
    }

    return (
        <div>
            <div className="compare-header-container">
                <CompareHeaderItem 
                    text='Rectangle'
                    active={currentGraph}
                    handleClick={(e) => {}}
                />
                <CompareHeaderItem 
                    text='Bass'
                    active={currentGraph}
                    handleClick={handleActiveGraph}
                />
                <CompareHeaderItem 
                    text='SPL'
                    active={currentGraph}
                    handleClick={handleActiveGraph}
                />
                <CompareHeaderItem 
                    text='THD'
                    active={currentGraph}
                    handleClick={handleActiveGraph}
                />
            </div>
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
                selectedDevices={bassData}
                handleClick={handleAddDevice}
            />
            { contentGraphNames }
            { contentGraph }
        </div>
    );
}

export default Compare;
