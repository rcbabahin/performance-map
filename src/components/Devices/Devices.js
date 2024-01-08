import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../../reducers/devices.js";
import FilterBox from "../FilterBox/FilterBox.js";
import DevicesList from "./DevicesList.js";
import DevicesTitle from "./DevicesTitle.js";

function Devices() {
    const [ currentCompany, setCurrentCompany ] = useState('All');

    const dispatch = useDispatch();

    const devicesStatus = useSelector(state => state.devices.status);
    const devices = useSelector(state => state.devices.devices);

    const companies = ['All', ...useSelector(state => state.devices.companies)];

    useEffect(() => {
        if (devicesStatus === 'idle') {
            dispatch(getDevices());
        }
    }, []);

    const handleFilterClick = (e) => {

		const innerText = e.target.innerText;

        setCurrentCompany(innerText);
	}

    if (devicesStatus === 'loading') {
        return <div className='loading'/>
    } else if (devicesStatus === 'failed') {
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
        <div className="devices-container">
            <div className="filter-box-container">
                <FilterBox 
                    data={companies}
                    filter={currentCompany}
                    handleClick={handleFilterClick}
                    className="filter-box-aside"
                />
            </div>
            <div className="devices-list-container">
                <DevicesTitle devicesNumber={filteredDevices.length} />
                <DevicesList devices={filteredDevices} />
            </div>
        </div>
    )
}

export default Devices;