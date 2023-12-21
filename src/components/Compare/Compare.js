
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getMeasurements } from "../../reducers/measurements.js";
import { getDevices } from "../../reducers/devices.js";
import GraphRatings from "./GraphRatings.js";
import { calculateRatings, setFilter } from "../../reducers/ratings.js";

const categoriesObj = {
	'All': 'All',
	'Mini': 'xs',
	'Small': 's',
	'Medium': 'm',
	'Large': 'l',
	'Extra Large': 'xl'
}

const ratingsNames = ['SPL', 'Bass Performance', 'SPL Performance', 'Bass / SPL', 'Flatness Index', 'Preference Index']

function Compare() {

    const dispatch = useDispatch();

    const devices = useSelector(state => state.devices.devices);
    const devicesStatus = useSelector(state => state.devices.status);
    
    const measurements = useSelector(state => state.measurements.measurements);
    const measurementsStatus = useSelector(state => state.measurements.status);

    const companies = useSelector(state => state.devices.companies);
	const categories = Object.keys(categoriesObj);

    const ratings = useSelector(state => state.ratings.ratings);
    const filter = useSelector(state => state.ratings.filter);
    const ratingsStatus = useSelector(state => state.ratings.status);

    useEffect(() => {
        if (devicesStatus === 'idle') {
            dispatch(getDevices());
        }

        if (measurementsStatus === 'idle') {
            dispatch(getMeasurements());
        }

    }, [ratingsStatus, dispatch])

    if (devicesStatus === 'loading' || measurementsStatus === 'loading') {
        return <div className='loading'/>
    } else if (devicesStatus === 'failed' || measurementsStatus === 'failed') {
        return<div>Somthing went wrong</div>
    }

    if (devicesStatus === 'succeded' && measurementsStatus === 'succeded' && ratingsStatus === 'idle') {
        
            // dispatch(calculateRatings({ devices, measurements }));
        
    }

    const handleClick = (type) => (e) => {
        console.log('here')
		const innerText = e.target.innerText;
		let newFilter = {};

		if (type === 'ratings') {
			newFilter = {
                rating: innerText,
				company: filter.company,
				category: filter.category,
			}
		} else if (type === 'company') {
			newFilter = {
                rating: filter.rating,
				company: innerText,
				category: filter.category,
			}
		} else if (type === 'category') {
			newFilter = {
                rating: filter.rating,
				company: filter.company,
				category: innerText,
			}
		}

		dispatch(setFilter({
			...newFilter
		}))
	}
    
    return (
        <div className="compare-container">
            <div className="compare-container-aside">
                <aside className="compare-ratings">
                    {
                        ratingsNames.map( rating => 
                            <div 
                                key={rating} 
                                className={`compare-ratings-item ${filter.rating === rating ? 'active' : ''}`} 
                                onClick={handleClick('ratings')}
                            >
                                {rating}
                            </div>
                        )
                    }
                </aside>
                <aside className='compare-companies'>
                    {
                        companies.map( company => 
                            <div 
                                key={company} 
                                className={`compare-companies-item ${filter.company === company ? 'active' : ''}`} 
                                onClick={handleClick('company')}
                            >
                                {company}
                            </div>
                        )
                    }
                </aside>
                <aside className='compare-categories'>
                    {
                        categories.map( category => 
                            <div 
                                key={category} 
                                className={`compare-categories-item ${filter.category === category ? 'active' : ''}`} 
                                onClick={handleClick('category')}
                            >
                                {category}
                            </div>
                        )
                    }
                </aside>
            </div>
            <div className="compare-graphs-container">
                { ratingsStatus === 'succeded' &&
                    ratings[filter.rating].map( (data, i) => 
                        <div key={i}>
                            <GraphRatings data={data} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Compare;