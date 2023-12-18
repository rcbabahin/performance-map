import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../../reducers/devices.js";

function Calculations(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		
        dispatch(getDevices())
    }, [])

	const status = useSelector(state => state.devices.status);
	const companies = useSelector(state => state.devices.companies);
	const categories = useSelector(state => state.devices.categories);

	if (status === 'loading') 
		return <div className='loading'/>


    return (
		<div className='calculations-container'>
			<aside className='calculations-companies'>
				{
					companies.map( company => 
						<div key={company} className="calculations-companies-item" >
							{company}
						</div>
					)
				}
			</aside>
			<aside className='calculations-categories'>
				{
					categories.map( category => 
						<div key={category} className="calculations-categories-item" >
							{category}
						</div>
					)
				}
			</aside>
			<div className='calculations-devices-names'></div>
			<section className='calculations-table'>

			</section>
		</div>
    );
}

export default Calculations;