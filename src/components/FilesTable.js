import { useState, useCallback } from 'react';
import TableType from './TableNames.js';
import TableBass from './TableBass.js';
import TableSPL from './TableSPL.js';
import Table from './Table.js';

function FilesTable({ 
    files,
    handleEditCellSubmit,
    handleSortByCategory
}) {
    const [tableIndex, setTableIndex] = useState(0);
    const [showBass, setShowBass] = useState(false);

    const handleTableTypeClick = (v) => (e) => {
		setTableIndex(v);
    };

    const handleCalculateClick = e => {
        setShowBass(!showBass);
    }

    const categories = Object.keys(files[0].file[0]);
    const names = files.map(file => file.name);
    
    return (
        <div>
            <TableType 
                tableTypes={names}
                tableIndex={tableIndex}
                handleTableTypeClick={handleTableTypeClick}
                handleCalculateClick={handleCalculateClick}
            />
            { !showBass &&
                <Table
                    data={files[tableIndex].file}
                    categoriesHeader={categories}
                    categoriesRow={categories}
                    tableIndex={tableIndex}
                    handleSortByCategory={handleSortByCategory}
                    handleEditCellSubmit={handleEditCellSubmit}
                />
            }
            { showBass && <TableBass data={files[tableIndex].file} /> }
            { showBass && <TableSPL data={files[tableIndex].file} deviceName={names[tableIndex]} /> }
        </div>
    );
}

export default FilesTable;