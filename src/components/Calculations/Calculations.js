import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CalculationsTable from "./CalculationsTable.js";
import FilterBox from "../FilterBox/FilterBox.js";

import { 
	getDevices, 
	setCurrentDeviceId, 
	setFilter, 
	selectCompanies,
	selectDevicesStatus,
	selectDevicesFilter,
	selectCurrentDeviceId,
	selectDeviceCategories
} from "../../reducers/devices.js"

function Calculations() {

	const dispatch = useDispatch();

	const status = useSelector(selectDevicesStatus);
	const [ all, ...companies ] = useSelector(selectCompanies);
	const filter = useSelector(selectDevicesFilter);
	const currentDeviceId = useSelector(selectCurrentDeviceId); 
	const categories = useSelector(selectDeviceCategories)

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getDevices())
		}
    }, [])

	const handleClick = (type) => (e) => {
		const innerText = e.target.innerText;
		let newFilter = {};

		if (type === 'company') {
			newFilter = {
				company: innerText,
				category: filter.category,
			}
		} else if (type === 'category') {
			newFilter = {
				company: filter.company,
				category: innerText,
			}
		}

		dispatch(setFilter({
			...newFilter
		}))
	}

	const handleActiveDevice = (id) => (e) => {
		dispatch(setCurrentDeviceId(id));
	}

	if (status === 'loading') 
		return <div className='loading'/>

    return (
		<div className='calculations-container'>
			<div className="calculations-container-aside">
				<FilterBox 
					data={companies}
					filter={filter.company}
					handleClick={handleClick('company')}
					className="calculations-companies"
				/>
				<FilterBox 
					data={categories}
					filter={filter.category}
					handleClick={handleClick('category')}
					className="calculations-categories"
				/>
				<div className='calculations-devices-names'>
					{	currentDeviceId !== 0 &&
						filter.devices.map( ({ id, name }) => 
							<div 
								key={id} 
								className={`calculations-devices-names-item ${id === currentDeviceId ? 'active': ''}`}
								onClick={handleActiveDevice(id)}
							>
								{name.length > 35 ? `${name.slice(0, 35)}...` : name}
							</div>
						)
					}
				</div>
			</div>
			<div className="calculations-container-main">

				{ status === 'succeded' &&
					<CalculationsTable />
				}
				{ status === 'failed' &&
					<div>Error fetching data from server</div>
				}
			</div>
		</div>
    );
}

export default Calculations;