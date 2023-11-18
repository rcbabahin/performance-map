import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';

function EditableCell({ cell, setEditCell, tableIndex, handleEditCellSubmit }) {
    const textArea = useRef(null);

    const iconStyle = {
        paddingRight: '10px'
    }

    const handleClick = (type) => (e) => {
        e.stopPropagation();

        switch (type) {
            case 'close':
                setEditCell({
                    ...cell,
                    showEditableCell: false
                })
                break;

            case 'submit':
                const { row, cat } = cell.cellIndex;
                const { value } = textArea.current;

                setEditCell({
                    ...cell,
                    showEditableCell: false
                })

                handleEditCellSubmit({
                    row,
                    cat, 
                    value,
                    tableIndex
                })
                break;

            default:
                break;
        }
    }

    return (
		<div className='editable-cell' >
            <span>Change selected cell</span>
            <textarea id="editable-cell" ref={textArea} maxLength="250" defaultValue={cell.cellText}></textarea>
            <button className='btn btn-close' onClick={handleClick('close')}>
                <FontAwesomeIcon icon={faClose} style={iconStyle}/>
                Cancel
            </button>
            <button className='btn btn-submit' onClick={handleClick('submit')}>
                <FontAwesomeIcon icon={faAdd} style={iconStyle}/>
                Submit
            </button>
		</div>
    );
}

export default EditableCell;