import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import GraphRatings from "../Graphs/GraphRatings.js";
import FilterBox from "../FilterBox/FilterBox.js";

import { 
    getMeasurements, 
    setFilter,
    selectMeasurementsFilter, 
    selectMeasurementsStatus, 
    selectRatings
} from "../../reducers/measurements.js";
import { 
    getDevices, 
    selectCompanies, 
    selectDevicesStatus,
    selectDeviceCategories
} from "../../reducers/devices.js";

const ratingsNames = ['SPL', 'Bass Performance', 'SPL Performance', 'Bass / SPL', 'Flatness Index', 'Preference Index']

function RatingsBySize() {

    const dispatch = useDispatch();

    const devicesStatus = useSelector(selectDevicesStatus);
    const measurementsStatus = useSelector(selectMeasurementsStatus);

    const companies = useSelector(selectCompanies);
	const categories = useSelector(selectDeviceCategories);

    const ratings = useSelector(selectRatings);
    const filter = useSelector(selectMeasurementsFilter);

    useEffect(() => {
        if (devicesStatus === 'idle') {
            dispatch(getDevices());
        }

        if (measurementsStatus === 'idle') {
            dispatch(getMeasurements());
        }

    }, []);

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
                <FilterBox 
                    data={ratingsNames}
                    filter={filter.rating}
                    handleClick={handleClick('ratings')}
                    className="compare-ratings"
                />
                <FilterBox 
                    data={companies}
                    filter={filter.company}
                    handleClick={handleClick('company')}
                    className="compare-companies"
                />
                <FilterBox 
                    data={categories}
                    filter={filter.category}
                    type="category"
                    handleClick={handleClick('category')}
                    className="compare-categories"
                />
            </div>
            <div className="compare-graphs-container">
                { 
                    graphsContent
                }
            </div>
        </div>
    );
}

export default RatingsBySize;