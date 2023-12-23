import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeasurements } from "../../reducers/measurements.js";

import FilesTable from "../FilesTable.js";


function CalculationsTable() {
    
    const dispatch = useDispatch();

    const status = useSelector(state => state.measurements.status);
    const deviceId = useSelector(state => state.devices.currentDeviceId);
    const measurements = useSelector(state => state.measurements.measurements);
    const devices = useSelector(state => state.devices.devices);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getMeasurements());
        }
    
    }, [status, dispatch])

    let content;

	if (status === 'loading') 
		return <div className='loading'/>
    if (status === 'succeded') {
        const meas = measurements.find(({ id }) => id === deviceId);
        const device = devices.find(({ id }) => id === deviceId);

        if (typeof meas === 'undefined' || typeof device === 'undefined') {
            content = <div style={{ margin : '30px 100px', color: 'red'}}>No devices found</div>
        } else {
            content = <FilesTable  file={meas} />
        }
    }

    return (
        <section className='calculations-table'>
            {content}
        </section>
    );
}

export default CalculationsTable;