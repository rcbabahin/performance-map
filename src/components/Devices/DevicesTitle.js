import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPager } from '@fortawesome/free-solid-svg-icons';


function DevicesTitle({ devicesNumber }) {

    let navigate = useNavigate();

    return (
        <div className='devices-list-title'>
            <FontAwesomeIcon icon={faPager} size='xl'/>
            <span className='devices-list-title-number'>
                {devicesNumber} {devicesNumber === 1 ? 'Device' : 'Devices'} Found
            </span>
            <button className='devices-list-title-add-btn' 
                onClick={() => navigate(`/add-new-device`)}>
                    + Add New Device
            </button>
        </div>
    )
}

export default DevicesTitle;