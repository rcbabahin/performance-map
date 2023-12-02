import TableHeader from "./TableHeader.js";
import TableRow from "./TableRow.js";

function Table({ data, categoriesRow, categoriesHeader, tableIndex, handleSortByCategory, handleEditCellSubmit }) {
    return (
        <div className='xl-table'>
            <TableHeader 
                categories={categoriesHeader}
                tableIndex={tableIndex}
                handleSortByCategory={handleSortByCategory}
            />
            <TableRow 
                data={data}
                categories={categoriesRow} 
                tableIndex={tableIndex}
                handleEditCellSubmit={handleEditCellSubmit} 
            />
        </div>
    );
}

export default Table;
