
function InfoItem({ children, header }) {

    return (    
        <div className="info-item">
            <h2 className="info-item-header">{header}</h2>
            <div className="info-item-separator"></div>
            <div className="info-item-desc">{children}</div>
        </div>
    );
}

export default InfoItem;
