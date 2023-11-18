import Button from './Button';

function TableType({ tableTypes, tableIndex, handleTableTypeClick, handleCalculateClick }) {
    const tables = tableTypes.map(tableName => tableName.slice(0, -4));

    return (
        <div className='table-type'>
            <div className='choose-table-type'>
                { tables.map( (table, index) =>
                    <div key={table} 
                        className={`choose-table-type-item ${tableIndex === index ? 'active' : ''}`} 
                        onClick={handleTableTypeClick(index)}
                    >
                        {table}
                    </div>							
                )}
            </div>
            <Button onClick={handleCalculateClick} className='btn btn-calculate'>Calculate</Button>
            <Button onClick={handleCalculateClick} className='btn btn-send-to-db'>Send to DB</Button>
        </div>
    );
}

export default TableType;