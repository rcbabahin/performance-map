import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getMeasurements, setFilter } from "../../reducers/measurements.js";
import { getDevices } from "../../reducers/devices.js";
import GraphAllDevicesRatings from "../Graphs/GraphAllDevicesRatings.js";
import FilterBox from "../FilterBox/FilterBox.js";

const categoriesObj = {
	'All': 'All',
	'Mini': 'xs',
	'Small': 's',
	'Medium': 'm',
	'Large': 'l',
	'Extra Large': 'xl'
}

const ratingsNames = ['SPL', 'Bass Performance', 'SPL Performance', 'Bass / SPL', 'Flatness Index', 'Preference Index']

function RatingsAllDevices() {

    const dispatch = useDispatch();

    const devicesStatus = useSelector(state => state.devices.status);
    
    const measurementsStatus = useSelector(state => state.measurements.status);

    const companies = ['All', ...useSelector(state => state.devices.companies)];

    const filter = useSelector(state => state.measurements.filter);
    const ratings = useSelector(state => state.measurements.ratingsAllDevices)

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
        const { rating, company } = filter;
        let filtered = ratings[rating];

        filtered = filtered.map(rating => {
            const newRating = structuredClone(rating);  
            const newItems = [...rating.items]

            newRating.items = newItems.sort((a,b) => {
                if (a.company.toLowerCase() < b.company.toLowerCase()) {
                    return -1;
                  }
                  if (a.company.toLowerCase() > b.company.toLowerCase()) {
                    return 1;
                  }
                  return 0;
            });

            return newRating;
        })

        if (company !== 'All') {
            filtered = filtered.map(rating => {
                const newRating = structuredClone(rating);  
                newRating.items = rating.items.filter(item => item.company === company);

                return newRating;
            })
        } 

        graphsContent = 
            <div >
                <GraphAllDevicesRatings data={filtered[0]} />
            </div>
        
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
        <div className="all-devices-container">
            <div>
                <FilterBox 
                    data={ratingsNames}
                    filter={filter.rating}
                    handleClick={handleClick('ratings')}
                    className="all-devices-ratings"
                />
                <FilterBox 
                    data={companies}
                    filter={filter.company}
                    handleClick={handleClick('company')}
                    className="all-devices-companies"
                />
            </div>
            <div className="all-devices-graph-container">
                { 
                    graphsContent
                }
            </div>
        </div>
    );
}

export default RatingsAllDevices;