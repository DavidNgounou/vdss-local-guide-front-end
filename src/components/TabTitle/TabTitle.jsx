import './TabTitle.css';
export default function TabTitle( { icon , children, isButton, showLine, isWide }){

    const Tag = isButton ? "button" : "div";

    return (
        <Tag className={`tab-title-with-line ${isWide ? "wide" : ""}`} >
            <div className="tab-title">
                  { icon }
                  { children }
            </div>
            {showLine && <div className="line"></div>}
        </Tag>
    )
}