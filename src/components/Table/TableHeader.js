function TableHeader({ categories, sticky }) {
    return (
        <div className='xl-table-header' style={{ position: sticky ? 'sticky' : 'relative'}}  >
            { categories.map(category =>
                <div key={category}>
                    {category}
                </div>							
            )}
        </div>
    );
}

export default TableHeader;