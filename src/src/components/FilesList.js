import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

function FilesList({ names }) {
    const iconStyle = {
        color: 'green'
    }
    return (
        <ul className="file-list">
            { names.map(name => (
                <li key={name}>
                    <FontAwesomeIcon style={iconStyle} icon={faFileExcel}  size="xl" /> {name}
                </li>
            ))}
        </ul>
    );
}

export default FilesList;