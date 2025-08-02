export default function TabTitle( { icon , children, isButton, showLine }){

    const Tag = isButton ? "button" : "div";

    return (
        <Tag className="tab-title-with-line">
            <div className="tab-title">
                  { icon }
                  { children }
            </div>
            {showLine && <div className="line"></div>}
        </Tag>
    )
}