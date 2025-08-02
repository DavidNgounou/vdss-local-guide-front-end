import FormInput from '../FormInput';
import TabTitle from '../TabTitle/TabTitle';
import RoadIcon from '../../assets/svgcomponents/RoadIcon';
import { useState } from 'react';
import FadeButton from '../fade-button/FadeButton';
import "./RoadSegmentTab.css";
import { sendData } from '../../../services/API';

export default function RoadSegmentTab({ point, roadSegment, setroadSegment, speedLimitButtons, setSpeedLimitButtons, activeFormButton }) {  
   
    const formLabels ={
      0: "Starting point",
      1: "Ending point",
    }

    function handleButtonClick(index) {
        setSpeedLimitButtons(index);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted with data:", roadSegment);

        const sentData = {
            name: roadSegment.name,
            speedLimitId: roadSegment.speedLimit,
            roadCoordinates: roadSegment.roadSegmentCoordinates,
            guideEmail: "johan@gmail.com"
        };

        sendData(sentData,"/api/road-segments").then((response) => {
            console.log("Data sent successfully:", response);
            // Optionally, reset the form or show a success message
        }).catch((error) => {
            console.error("Error sending data:", error);
            // Optionally, show an error message
        });

        
    }

    function handleReset(){
        setroadSegment({
            startingPoint: "",
            endingPoint: "",
            name: "",
            speedLimit: "",
            roadSegmentCoordinates:[],
        });
    }

    
    console.log("activeFormButton:", activeFormButton);

    return (
        <div id="road-segment" className='tab-section'>
            <div className="sub-tab-section-menu">
                <TabTitle isButton={true}  showLine={true}>Add road segment</TabTitle>
                <TabTitle isButton={true} showLine={true}>Modify road segment</TabTitle>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="vertical">
                    <FadeButton
                        buttonText="Set Starting point"
                        isActive={0 === speedLimitButtons}
                        onClick={() => setSpeedLimitButtons(0)}
                    />
                    <FadeButton
                        buttonText="Set Ending point"
                        isActive={1 === speedLimitButtons}
                        onClick={() => setSpeedLimitButtons(1)}
                    />
                </div>
                <FormInput
                    label={0 === speedLimitButtons ? formLabels[0] : formLabels[1]}
                    name={activeFormButton}
                    placeholder={roadSegment[0 === speedLimitButtons ? "startingPoint" : "endingPoint"]}
                    value={roadSegment[activeFormButton]}
                    readOnly
                />
                <hr />
                <FormInput
                    label="Segment name"
                    value={roadSegment["name"]}
                    onChange={(e) => setroadSegment({ ...roadSegment, name: e.target.value })}
                    placeholder="Enter segment name"
                />
                <FormInput
                    label="Speed limit(Kmh)"
                    type="number"
                    value={roadSegment.speedLimit}
                    onChange={(e) => setroadSegment({ ...roadSegment, speedLimit: e.target.value })}
                />

                <div className="submit-buttons">
                    <button type="submit" className='submit-button' onClick={handleSubmit}>Submit</button>
                    <button type="reset" className='cancel-button' onClick={handleReset}>Cancel</button>
                </div>
            </form>
        </div>
    );
}