import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPager } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


function DevicesTitle({ devicesNumber, sortType, sortOrder, handleSort }) {
    const [ showList, setShowList ] = useState(false);

    let navigate = useNavigate();

    const handleMenuClick = () => {
        setShowList(!showList)
    }

    const handleMouseLeave = () => {
        setShowList(false)
    }

    const handleMenuElementClick = (props) => (e) => {
        e.stopPropagation();

        setShowList(false);
        handleSort(props);
    }

    return (
        <div className='devices-list-title'>
            <FontAwesomeIcon icon={faPager} size='xl'/>
            <span className='devices-list-title-number'>
                {devicesNumber} {devicesNumber === 1 ? 'Device' : 'Devices'} Found
            </span>
            <div className='devices-list-title-sortby'>
                <span>Sort by : </span>
                <span className='sortby-list-arrow' onClick={handleMenuClick}>
                    {`${sortType} ${sortOrder}`} <FontAwesomeIcon icon={faAngleDown} color="white" size="sm" />
                    { showList &&
                        <ul className='sortby-list' onMouseLeave={handleMouseLeave}>
                            <li onClick={handleMenuElementClick(['Volume', 'Asc'])}>Volume Asc</li>    
                            <li onClick={handleMenuElementClick(['Volume', 'Desc'])}>Volume Desc</li>    
                            <li onClick={handleMenuElementClick(['Name', 'A-Z'])}>Name A-Z</li> 
                            <li onClick={handleMenuElementClick(['Name', 'Z-A'])}>Name Z-A</li> 
                        </ul>
                    }    
                </span>
            </div>  
            <button className='devices-list-title-add-btn' 
                onClick={() => navigate(`/add-new-device`)}>
                    + Add New Device
            </button>
        </div>
    )
}

export default DevicesTitle;