import TabTitle from "../TabTitle";
import './SubSection.css'
export default function SubSection({sectionTitle, sectionIcon, showTitleLine=true, children}){

    return (
        <div className="sub-section">
            <TabTitle icon={sectionIcon} showLine={showTitleLine}>
                <h3>{sectionTitle}</h3>
            </TabTitle>

            {children}

            <hr />
        </div>
    );

}