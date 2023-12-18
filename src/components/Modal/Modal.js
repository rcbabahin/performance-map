import { useSelector } from "react-redux";

function Modal({ handleModalClose }) {
    const status = useSelector(state => state.devices.status);
    const error = useSelector(state => state.devices.error);
    let text = '';

    if (status === 'failed') {
        text = `⛔ Error saving to Database: "${error}"`
    } else if (status === 'succeeded') {
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

export default Modal;