import { useState } from "react";

import TableHeader from "./TableHeader.js";
import TableRow from "./TableRow.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Table({ data, categoriesRow, categoriesHeader }) {

    const [ isCollapsed, setCollapse ] = useState(false);

    const handleCollapseTable = (e) => {
        setCollapse(prevIsCollapsed => !prevIsCollapsed);
    }

    const rowData = isCollapsed ? [data[data.length - 1]] : [ ...data ];
    
    return (
        <div className="xl-table-container">
            <div 
                className="collapse-button" 
                onClick={handleCollapseTable}
                style={{ position: isCollapsed ? 'auto' : 'sticky' }}>
                <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp }  size="xs" />
            </div>
            <div className='xl-table'>
                <TableHeader 
                    categories={categoriesHeader}
                    sticky={!isCollapsed}
                />
                <TableRow 
                    data={rowData}
                    categories={categoriesRow} 
                />
            </div>
        </div>
    );
}

export default Table;
