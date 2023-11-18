function TableHeader({ categories, tableIndex, handleSortByCategory }) {
    return (
        <div className='xl-table-header'>
            { categories.map(category =>
                <div key={category} onClick={handleSortByCategory(category, tableIndex)}>
                    {category}
                </div>							
            )}
        </div>
    );
}

export default TableHeader;