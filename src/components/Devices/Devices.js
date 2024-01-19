import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterBox from "../FilterBox/FilterBox.js";
import DevicesList from "./DevicesList.js";
import DevicesTitle from "./DevicesTitle.js";

import { 
    getDevices, 
    selectCompanies, 
    selectDevicesStatus, 
    selectDevices,
    selectSizeCategoriesArray,
    selectSizeCategoriesObject
} from "../../reducers/devices.js";

function Devices() {
    const [ currentCompany, setCurrentCompany ] = useState('All');
    const [ currentSize, setCurrentSize ] = useState('All');
    const [ sortType, setSortType ] = useState('Volume')
    const [ sortOrder, setSortOrder ] = useState('Asc');

    const dispatch = useDispatch();

    const status = useSelector(selectDevicesStatus);
    const devices = useSelector(selectDevices);

    const companies = useSelector(selectCompanies);
    const categories = useSelector(selectSizeCategoriesArray);
    const categoriesObj = useSelector(selectSizeCategoriesObject);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getDevices());
        }
    }, []);

    const handleFilterClick = (type) => (e) => {

		const innerText = e.target.innerText;

        if (type === 'company') {
            setCurrentCompany(innerText);
        }
        else if (type === 'category') {
            setCurrentSize(innerText);
        }
	}

    const handleSort = (props) => {
        const [ type, order ] = props;

        setSortOrder(order);
        setSortType(type);
    }

    if (status === 'loading') {
        return <div className='loading'/>
    } else if (status === 'failed') {
        // return <div className="something-went-wrong">Downloading failed ಠ﹏ಠ</div>
    }

    let filteredDevices = devices
        .filter(d => {
            if (currentCompany === 'All') {
                return true;
            } else {
                return d.company === currentCompany;
            }
        })
        .filter(d => {
            if (currentSize === 'All') {
                return true;
            } else {
                return categoriesObj[d.category] === currentSize;
            }
        })
        .sort((a, b) => {
            if (sortType === 'Volume') {
                if (sortOrder === 'Asc') {
                    return +a.size - +b.size
                }
                else if (sortOrder === 'Desc') {
                    return +b.size - +a.size
                }
            }
            else if (sortType === 'Name') {
                if (sortOrder === 'A-Z') {
                    return a.name.localeCompare(b.name)
                }
                else if (sortOrder === 'Z-A') {
                    return b.name.localeCompare(a.name)
                }
            }
        });

    return (
        <div className="devices-container">
            <div className="filter-box-container">
                <FilterBox 
                    data={companies}
                    filter={currentCompany}
                    handleClick={handleFilterClick('company')}
                    className="filter-box-aside"
                />
                <FilterBox 
                    data={categories}
                    filter={currentSize}
                    type="category"
                    handleClick={handleFilterClick('category')}
                    className="filter-box-aside"
                />
            </div>
            <div className="devices-list-container">
                <DevicesTitle 
                    devicesNumber={filteredDevices.length} 
                    sortType={sortType}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                />
                <DevicesList devices={filteredDevices} />
            </div>
        </div>
    )
}

export default Devices;