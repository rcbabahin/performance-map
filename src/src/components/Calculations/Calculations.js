import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices, setCurrentDeviceId, setFilter } from "../../reducers/devices.js";
import CalculationsTable from "./CalculationsTable.js";

const categoriesObj = {
	'All': 'All',
	'Extra Small': 'xs',
	'Small': 's',
	'Medium': 'm',
	'Large': 'l',
	'Extra Large': 'xl'
}

function Calculations() {

	const dispatch = useDispatch();

	const status = useSelector(state => state.devices.status);
	const companies = useSelector(state => state.devices.companies);
	const categories = Object.keys(categoriesObj);
	const filter = useSelector(state => state.devices.filter);
	const currentDeviceId = useSelector(state => state.devices.currentDeviceId); 

	useEffect(() => {

		if (status === 'idle') {
			dispatch(getDevices())
		}
		
    }, [status, dispatch])

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
				<aside className='calculations-companies'>
					{
						companies.map( company => 
							<div 
								key={company} 
								className={`calculations-companies-item ${company === filter.company ? 'active': ''}`} 
								onClick={handleClick('company')}
							>
								{company}
							</div>
						)
					}
				</aside>
				<aside className='calculations-categories'>
					{
						categories.map( category => 
							<div 
								key={category} 
								className={`calculations-categories-item ${category === filter.category ? 'active': ''}`} 
								onClick={handleClick('category')}
							>
								{category}
							</div>
						)
					}
				</aside>
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