import { useState, useCallback } from 'react';
import TableNames from './TableNames.js';
import TableBass from './TableBass.js';
import TableSPL from './TableSPL.js';
import Table from './Table.js';
import { useSelector } from 'react-redux';

function FilesTable({ file, name }) {
    return (
        <div>
            {/* <Table
                data={file}
                categoriesHeader={categories}
                categoriesRow={categories}
            /> */}
            <TableBass data={file} />
            <TableSPL data={file} deviceName={name} />
        </div>
    );
}

export default FilesTable;