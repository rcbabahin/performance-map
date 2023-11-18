import  FilesList from './FilesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

const Header = ({ files, handleFileChange, handleViewClick }) => { 
    const names = files.map(({ name }) => name);

    return (
        <header>
            <div className='project-name'>Sound Performance Map</div>
            <div className='upload-files'>
                <div>
                    <label htmlFor="upload-file"><FontAwesomeIcon icon={faFileCsv}  size="xl" />Choose Files </label>
                    <input id='upload-file' type="file" onChange={handleFileChange} multiple />
                </div>
                <FilesList names={names}/>
                { names.length > 0 ? 
                    <button className='btn btn-merge' onClick={handleViewClick}>View Files</button>
                    : ''
                }
            </div>
        </header>
    );
}

export default Header;