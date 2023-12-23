
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getMeasurements, setFilter } from "../../reducers/measurements.js";
import { getDevices } from "../../reducers/devices.js";
import GraphRatings from "./GraphRatings.js";

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

    const devicesStatus = useSelector(state => state.devices.status);
    
    const measurementsStatus = useSelector(state => state.measurements.status);

    const companies = ['All', ...useSelector(state => state.devices.companies)];
	const categories = Object.keys(categoriesObj);

    const ratings = useSelector(state => state.measurements.ratings);
    const filter = useSelector(state => state.measurements.filter);

    useEffect(() => {
        if (devicesStatus === 'idle') {
            dispatch(getDevices());
        }

        if (measurementsStatus === 'idle') {
            dispatch(getMeasurements());
        }

    }, [dispatch]);

    let graphsContent;

    if (devicesStatus === 'loading' || measurementsStatus === 'loading') {
        return <div className='loading'/>
    } else if (devicesStatus === 'failed' || measurementsStatus === 'failed') {
        graphsContent = <div className="something-went-wrong">Downloading failed ಠ﹏ಠ</div>
    } else if (measurementsStatus === 'succeded') {
        const { rating, company, category } = filter;
        let filtered = [];

        if (category === 'All') {
            filtered = ratings[rating]
        } else {
            filtered = ratings[rating].filter(rating => rating.header.slice(0, -8) === category)
        }

        if (company !== 'All') {
            filtered = filtered.map(rating => {
                const newRating = structuredClone(rating);  
                newRating.items = [...rating.items.filter(item => item.company === company)];

                return newRating;
            })
        } 

        const isEmpty = filtered.filter(el => el.items.length).length

        if (isEmpty) {
            graphsContent = filtered.map( (data, i) => 
                <div key={i}>
                    <GraphRatings data={data} />
                </div>
            )
        } else {
            graphsContent = <div className="something-went-wrong">No Devices for this filter 😓</div>
        }
        
    }

    const handleClick = (type) => (e) => {
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
                { 
                    graphsContent
                }
            </div>
        </div>
    );
}

export default Compare;