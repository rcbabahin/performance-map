function Button({ onClick, className, children }) {
    return (
        <button className={className} onClick={e => {
            e.stopPropagation();
            onClick();
        }}>
            {children}
        </button>
    );
}

export default Button;