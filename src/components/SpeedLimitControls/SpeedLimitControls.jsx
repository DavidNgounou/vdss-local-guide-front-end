import { useState } from 'react';

import './SpeedLimitControls.css';
import '../FormInput/FormInput.css';

import filter from '../../assets/filter.svg';
import sun from '../../assets/sun.svg';
import sunrise from '../../assets/sunrise.svg';
import moon from '../../assets/moon.svg';
import viewIcon from '../../assets/ViewsIcon.svg';

import SunRiseIcon from '../../assets/svgcomponents/SunRiseIcon';

import TabTitle from '../TabTitle';
import SubSection from '../SubSection/SubSection';
import FadeButton from '../fade-button/FadeButton';
import Select from 'react-select';
import DayCard from '../DayCard/DayCard';
import SunIcon from '../../assets/svgcomponents/sunIcon';
import MoonIcon from '../../assets/svgcomponents/MoonIcon';
import MapIcon from '../../assets/svgcomponents/MapIcon';

export default function SpeedLimitControls({selectedView, setSelectedView, carPlates, carPlate, setCarPlate, hRviewState, handlehRviewChange }){
    // const carPlates = [
    //     {value: 'OU-618-CJ', label: 'OU-618-CJ'},
    //     {value: 'CE-918-CJ', label: 'CE-518-CJ'}
    // ]

    
    // const [carPlate, setCarPlate] = useState(carPlates[0]);

    
    const [selectedTime, setSelectedTime] = useState(0);

    return (
        <div id="speed-limit-controls">

            <TabTitle showLine={true}>
                <h2>View Car Speed Violations</h2>
            </TabTitle>

            <SubSection 
                sectionTitle={"Want to be more specific?"} 
                showTitleLine={false}

            >
                <div className="form-group">
                    <label
                        style={{fontWeight: "600", marginBottom: "0.2rem"}}
                        htmlFor='car-plate'
                    >
                        Search a car's plate number
                    </label>
                    <Select 
                        id='car-plate' 
                        options={carPlates}
                        value={carPlate}
                        onChange={(e)=>setCarPlate(e)}
                    >

                    </Select>
                </div>
            </SubSection>
            <SubSection
                sectionTitle={"Map filters"}
                showTitleLine={false}
                sectionIcon={<img src={filter}/>}
            >
                <p>Display areas prone to speed limit violations</p>

                <div 
                    className="time-filters"
                    style={{display: "flex", flexDirection: "wrap", gap: "0.5rem", marginTop: "1rem"}}
                >
                    <FadeButton 
                        buttonText={'Show all '} 
                        onClick={()=>handlehRviewChange()} 
                        isActive={hRviewState}
                        style={{padding: "5em"}}
                    />                    
                </div>
                
            </SubSection>

            <SubSection
                sectionTitle={"Time of the day"}
                showTitleLine={false}
                sectionIcon={<img src={sun}/>}
            >
                <div className="day-cards">
                    <DayCard
                        icon={<SunRiseIcon fillColor={selectedTime === 0 ? "#fff" : "#4285F4"} />}
                        cardTitle={"Morning"}
                        onClick={()=>setSelectedTime(0)}
                        isActive={selectedTime === 0}
                        
                    />
                    <DayCard
                        icon={<SunIcon fillColor={selectedTime === 1 ? "#fff" : "#4285F4"} />}
                        cardTitle={"Afternoon"}
                        onClick={()=>setSelectedTime(1)}
                        isActive={selectedTime === 1}
                    />
                    <DayCard
                        icon={<MoonIcon fillColor={selectedTime === 2 ? "#fff" : "#4285F4"} />}
                        cardTitle={"Evening"}
                        onClick={()=>setSelectedTime(2)}
                        isActive={selectedTime === 2}
                    />
                </div>
            </SubSection>
            <SubSection
                sectionTitle={"Views"}
                showTitleLine={false}
                sectionIcon={<img src={viewIcon}/>}
            >
                <div className="day-cards">
                    <DayCard
                        icon={<MapIcon fillColor={selectedView === 0 ? "#fff" : "#4285F4"}/>}
                        cardTitle={"Map View"}
                        isActive={selectedView === 0}
                        onClick={()=>setSelectedView(0)}
                    />
                    <DayCard
                        icon={<MapIcon fillColor={selectedView === 1 ? "#fff" : "#4285F4"}/>}
                        cardTitle={"List View"}
                        isActive={selectedView === 1}
                        onClick={()=>setSelectedView(1)}
                    />
                </div>
            </SubSection>

        </div>
    );
}