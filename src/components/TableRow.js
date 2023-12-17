import { useState } from 'react';
import EditableCell from './EditableCell.js';

function TableRow({ categories, data, tableIndex, handleEditCellSubmit }) {
    const [editableCell, setEditCell] = useState({
		showEditableCell: false,
        cellText: '',
		cellIndex: {
            row: 0,
            cat: 0
        }
	});

    const handleClick = (row, cat) => (e) => {
        if (editableCell.showEditableCell === false) {
            setEditCell({
                showEditableCell: true,
                cellText: e.target.innerText,
                cellIndex: {
                    row,
                    cat
                }
            })
        }
    }  

    const { showEditableCell, cellIndex } = editableCell;

    return (
        <div>
            { data.map( (csvData, rowIndex) =>
                <div className='xl-table-row' key={csvData[Object.keys(csvData)[0]]} >
                    { categories.map((category, catIndex) => {
                        if (showEditableCell && cellIndex.row === rowIndex && cellIndex.cat === catIndex) {
                            return (
                                <div key={category} onClick={handleClick(rowIndex, catIndex)}>
                                    <EditableCell 
                                        cell={editableCell} 
                                        setEditCell={setEditCell}
                                        tableIndex={tableIndex}
                                        handleEditCellSubmit={handleEditCellSubmit}
                                    />
                                </div>
                            );
                        } 
                        else {
                            return (
                                <div key={(rowIndex + 1) * (catIndex + 1)} onClick={handleClick(rowIndex, catIndex)}>
                                    { csvData[category] }
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default TableRow;