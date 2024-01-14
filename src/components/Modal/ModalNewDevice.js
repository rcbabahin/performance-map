import { useSelector } from "react-redux";

import { selectDevicesStatus, selectDevciesError } from "../../reducers/devices.js";

function ModalNewDevice({ handleModalClose }) {
    const status = useSelector(selectDevicesStatus);
    const error = useSelector(selectDevciesError);
    let text = '';

    if (status === 'loading')
        return <div className='loading'/>

    if (status === 'failed') {
        text = `⛔ Error saving to Database: "${error}"`
    } else if (status === 'succeded') {
        text = '✨ All measurements succesfully saved into Database!'
    }
    
    return (
        <div className='modal'>
            <div className="modal-content">
                <div className="close" onClick={handleModalClose}>&times;</div>
                <div className="status-text">{text}</div>
            </div>
        </div>
    )
}

export default ModalNewDevice;