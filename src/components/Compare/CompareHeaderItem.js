function CompareHeaderItem({ text, active, handleClick }) {
    let newClass = active === text.toLowerCase() ? 'header-item-active' : '';

    let headerActivePosition;
    
    if (text === 'Rectangle') {
        newClass = 'header-moving-rect';

        headerActivePosition = { left: active === 'bass' 
        ? '10.5%' 
        : active === 'spl' 
            ? '37%' 
            : '62.5%'
    }
    }

    return (
        <div className={newClass} onClick={handleClick} style={headerActivePosition}>
            {text === 'Rectangle' ? '' : text}
        </div>
    )
}

export default CompareHeaderItem;