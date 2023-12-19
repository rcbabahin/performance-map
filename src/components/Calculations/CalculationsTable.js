import { useEffect, useState } from "react";
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
            // console.log(company)
            dispatch(getMeasurements());
        }
    
    }, [dispatch])

    let content;

	if (status === 'loading') 
		return <div className='loading'/>
    if (status === 'succeded') {
        const { items } = measurements.find(({ id }) => id === deviceId)
        const { name } = devices.find(({ id }) => id === deviceId);

        content = <FilesTable  file={items} name={name}/>
    }

    return (
        <section className='calculations-table'>
            {content}
        </section>
    );
}

export default CalculationsTable;