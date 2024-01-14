import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    getMeasurements, 
    selectMeasurementsStatus, 
    selectMeasurements 
} from "../../reducers/measurements.js";
import { 
	selectDevices,
	selectCurrentDeviceId
} from "../../reducers/devices.js";

import FilesTable from "./FilesTable.js";

function CalculationsTable() {
    
    const dispatch = useDispatch();

    const status = useSelector(selectMeasurementsStatus);
    const measurements = useSelector(selectMeasurements);
    
    const devices = useSelector(selectDevices);
    const deviceId = useSelector(selectCurrentDeviceId);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getMeasurements());
        }
    }, [])

    let content;

	if (status === 'loading') 
		return <div className='loading'/>

    if (status === 'failed')
        return <div className="something-went-wrong">Downloading failed ಠ﹏ಠ</div>

    if (status === 'succeded') {
        const measure = measurements.find(({ id }) => id === deviceId);
        const device = devices.find(({ id }) => id === deviceId);

        if (typeof measure === 'undefined' || typeof device === 'undefined') {
            content = <div className="something-went-wrong">No Devices for this filter 😓</div>
        } else {
            content = <FilesTable  file={measure} />
        }
    }

    return (
        <section className='calculations-table'>
            {content}
        </section>
    );
}

export default CalculationsTable;