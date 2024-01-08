import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDevice } from '../../reducers/devices.js';

const categoriesObj = {
	'All': 'All',
	'xs': 'Mini',
	's': 'Small',
	'm': 'Medium',
	'l': 'Large',
	'xl': 'Extra Large'
}

function DevicesListItem(device) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleDeleteDevice = (e) => {
        dispatch(deleteDevice(device.id))
    }

    return (
        <div className="devices-list-item">

            <div className="devices-list-item-main">
                <div className="devices-list-item-main-name">
                    <span>Name:</span> {device.name}
                </div>
                <div className="devices-list-item-main-company">
                    <span>Company:</span> {device.company}
                </div>
                <div className="devices-list-item-main-volume">
                    <span>Volume:</span> {device.size} liters
                </div>
                <div className="devices-list-item-main-category">
                    <span>Size caterogy:</span> {categoriesObj[device.category]}
                </div>
            </div>

            <div className='devices-list-buttons-container'>
                <button 
                    className="devices-list-edit-button" 
                    onClick={ () => {navigate('/edit-device', { state: { device } })} }
                > 
                    <FontAwesomeIcon icon={faPen} size='sm'/> Edit
                </button>
                <button 
                    className="devices-list-delete-button"
                    onClick={ handleDeleteDevice }
                > 
                    <FontAwesomeIcon icon={faTrash} size='sm'/> Delete
                </button>
            </div>
        </div>
    )
}

export default DevicesListItem;