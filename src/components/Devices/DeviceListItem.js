import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDevice, setFilter } from '../../reducers/devices.js';
import { deleteMeasurement } from '../../reducers/measurements.js';

const categoriesObj = {
	'All': 'All',
	'xs': 'Mini',
	's': 'Small',
	'm': 'Medium',
	'l': 'Large',
	'xl': 'Extra Large'
}

const categoriesObjCalculations = {
	'All': 'All',
	'xs': 'Extra Small',
	's': 'Small',
	'm': 'Medium',
	'l': 'Large',
	'xl': 'Extra Large'
}

function DevicesListItem(device) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleDeleteDevice = async (e) => {
        await dispatch(deleteDevice(device.id));
        await dispatch(deleteMeasurement(device.id))
    }

    const handleTitleClick = (e) => {

        let newFilter = {
            company: device.company,
            category: categoriesObjCalculations[device.category]
        };

		dispatch(setFilter({
			...newFilter
		}));

        navigate('/calculations');
    }

    return (
        <div className="devices-list-item">

            <div className="devices-list-item-main">
                <div className="devices-list-item-main-name">
                    <a onClick={handleTitleClick}><span>Name:</span> {device.name}</a>
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