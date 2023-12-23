import TableBass from './TableBass.js';
import TableSPL from './TableSPL.js';

function FilesTable({ file }) {
    return (
        <div>
            <TableBass data={file} />
            <TableSPL data={file} />
        </div>
    );
}

export default FilesTable;