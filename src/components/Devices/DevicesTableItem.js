import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { 
    deleteDevice, 
    setFilter, 
    selectSizeCategoriesObject
} from '../../reducers/devices.js';
import { deleteMeasurement } from '../../reducers/measurements.js';

function DevicesTableItem(device) {
    const [ showPrompt, setShowPrompt ] = useState(false);

    const dispatch = useDispatch();

    const categories = useSelector(selectSizeCategoriesObject);

    const navigate = useNavigate();

    const handlePrompt = (prompt) => (e) => {
        e.stopPropagation();

        if (prompt === 'delete') {
            DeleteDevice();
            setShowPrompt(false);
        }
        else if (prompt === 'cancel') setShowPrompt(false);
    }

    const DeleteDevice = async (e) => {
        await dispatch(deleteDevice(device.id));
        await dispatch(deleteMeasurement(device.id))
    }

    const handleTitleClick = (e) => {

        let newFilter = {
            company: device.company,
            category: categories[device.category]
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
                    <a onClick={handleTitleClick}>{device.name}</a>
                </div>
                <div className="devices-list-item-main-company">
                    {device.company}
                </div>
                <div className="devices-list-item-main-volume">
                    {device.size}
                </div>
                <div className="devices-list-item-main-category">
                    {categories[device.category]}
                </div>
                <button 
                    className="devices-list-edit-button" 
                    onClick={ () => {navigate('/edit-device', { state: { device } })} }
                > 
                    <FontAwesomeIcon icon={faPen} size='sm'/>
                </button>
                <button 
                    className="devices-list-delete-button"
                    onClick={ () => { setShowPrompt(!showPrompt); } }
                > 
                    { showPrompt && 
                        <div className="prompt" onMouseLeave={() => { setShowPrompt(false); }}>
                            <span>Are you sure you want to delete device? </span>
                            <button 
                                className="prompt-yes-btn" 
                                onClick={handlePrompt('delete')}
                            >
                                Yes
                            </button>
                            <button 
                                className="prompt-cancel-btn" 
                                onClick={handlePrompt('cancel')}
                            >
                                Cancel
                            </button>
                        </div>
                    }
                    <FontAwesomeIcon icon={faTrash} size='sm'/>
                </button>
            </div>
        </div>
    )
}

export default DevicesTableItem;