function TableRow({ categories, data }) {
    return (
        <div>
            { data.map( (csvData, rowIndex) =>
                <div className='xl-table-row' key={csvData[Object.keys(csvData)[0]]} >
                    { categories.map((category, catIndex) => {
                        return (
                            <div key={(rowIndex + 1) * (catIndex + 1)}>
                                { csvData[category] }
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default TableRow;