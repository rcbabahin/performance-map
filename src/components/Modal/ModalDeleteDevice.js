import { useSelector } from "react-redux";

function ModalNewDevice({ handleModalClose }) {
    const status = useSelector(state => state.devices.status);
    const error = useSelector(state => state.devices.error);
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