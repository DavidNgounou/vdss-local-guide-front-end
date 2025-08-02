
import HelpBar from "../HelpBar/HelpBar";
import SubSection from "../SubSection/SubSection";
import filter from "../../assets/filter.svg"
import FadeButton from "../fade-button/FadeButton";

import "./RoadAnalysisTab.css";
export default function RoadAnalysisTab({ onClick, isActive,selectedButton, setSelectedButton }) {
    
    return (
        <div id="road-analytics" className='tab-section'>

            <SubSection
                sectionTitle={"Map filters"}
                showTitleLine={true}
                sectionIcon={<img src={filter}/>}
                
            >
                <p>Display areas prone to speed violations </p>

                <div 
                    className="time-filters"
                    style={{display: "flex", flexDirection: "wrap", gap: "0.5rem", marginTop: "1rem"}}
                >
                    <FadeButton buttonText={'All'} onClick={()=>setSelectedButton(0)} isActive={selectedButton === 0}/>
                    <FadeButton buttonText={'Today'} onClick={()=>setSelectedButton(1)} isActive={selectedButton === 1}/>
                    <FadeButton buttonText={'Last month'} onClick={()=>setSelectedButton(2)} isActive={selectedButton ===2}/>
                    <FadeButton buttonText={'Last year'} onClick={()=>setSelectedButton(3)} isActive={selectedButton === 3}/>
                    
                </div>
                
            </SubSection>
        </div>
    );
}