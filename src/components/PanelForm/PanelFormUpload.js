import FilesList from '../FilesList.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faCancel, faFileCsv, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const iconStylePaddingRight = {
    paddingRight: '10px'
}

const PanelFormUpload = ({ handleCancel, handleFileChange, fileName, isValid, show }) => {
    const validationText = isValid ? 'valid. Now you can save it to Database' : 'not valid. Check file.';
    
    const iconStyleValidation = {
        paddingLeft: '10px',
        color: isValid ? 'green' : 'red'
    }

    const iconValidation = isValid ? faThumbsUp : faThumbsDown;

    const status = useSelector(state => state.devices.status);
    const error = useSelector(state => state.devices.error);

    const handleClick = (type) => (e) => {

    }

    return (
        <div className='upload-container'>
            <div className="upload-container-choose-file">
                <label htmlFor="upload-file"><FontAwesomeIcon icon={faFileCsv}  size="xl" />Choose File </label>
                <input id='upload-file' type="file" onChange={handleFileChange} />
            </div>
            { show && <FilesList names={[fileName]}/>}
            { show && 
                <div className='validation-container'>File is {validationText}
                    <FontAwesomeIcon style={iconStyleValidation} icon={iconValidation}  size="xl" />
                </div>
            }
            { status === 'succeeded' &&
            <div>
                File succesfully saved in Database!
            </div>
            }
            { status === 'failed' &&
            	<div className='editable-cell' >
                    <span>Error saving to Database:</span>
                    <div>{error}</div>
                    <button className='btn btn-close' onClick={handleClick('close')}>
                        <FontAwesomeIcon icon={faClose} style={iconStylePaddingRight}/>
                        Cancel
                    </button>
                    <button className='btn btn-submit' onClick={handleClick('submit')}>
                        <FontAwesomeIcon icon={faAdd} style={iconStylePaddingRight}/>
                        Try Again
                    </button>
                </div>
            }
            <div className='upload-container-btns'>
                <button type="submit" className="btn btn-blue" disabled={!isValid} >
                    <FontAwesomeIcon icon={faAdd} style={iconStylePaddingRight}/>
                    Add
                </button>
                <button className="btn btn-cancel" onClick={handleCancel}>
                    <FontAwesomeIcon icon={faCancel} style={iconStylePaddingRight}/>
                    Cancel
                </button>
            </div>
        </div>
    )
}


export default PanelFormUpload;