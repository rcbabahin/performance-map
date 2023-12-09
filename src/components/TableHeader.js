function TableHeader({ categories, tableIndex, handleSortByCategory, sticky }) {
    return (
        <div className='xl-table-header' style={{ position: sticky ? 'sticky' : 'relative'}}  >
            { categories.map(category =>
                <div key={category} onClick={handleSortByCategory(category, tableIndex)}>
                    {category}
                </div>							
            )}
        </div>
    );
}

export default TableHeader;