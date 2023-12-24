
function FilterBox({ data, className, filter, handleClick }) {

    return (
        <aside className={className}>
            {
                data.map( item => 
                    <div 
                        key={item} 
                        className={`${className}-item ${filter === item ? 'active' : ''}`} 
                        onClick={handleClick}
                    >
                        {item}
                    </div>
                )
            }
        </aside>
    );
}

export default FilterBox;