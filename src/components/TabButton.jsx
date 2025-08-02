export default function TabButton({ icon, children, isActive, ...props}) {
    return (
        <button 
            type="button" 
            className = {`section-tab-button ${ isActive ? "active" : null}`}
            {...props} 
        >
            {icon}
            <p>
                {children}
            </p>
        </button>
    );
}