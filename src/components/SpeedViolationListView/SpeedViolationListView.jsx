import HelpBar from '../HelpBar/HelpBar';
import SideMap from '../SideMap/SideMap';
import Table from '../Table/Table';

import './SpeedViolationListView.css';
import { carViolations } from '../../Data/Data';    

import { useState, useEffect } from 'react';
export default function SpeedViolationListView({carPlate}) {
    const [segmentCoordinates, setSegmentCoordinates] = useState([]);
    useEffect(() => {
        if (carPlate && carViolations[carPlate]) {
            const coordinates = carViolations[carPlate].coordViolatedSegment;
            setSegmentCoordinates(coordinates);
        }
    }, [carPlate]);
    return (
        
            <div className="speed-violation-list-view">
                {!carPlate ? 
                <div className="error-message">
                    <h2>Please select a car to view its speed violations.</h2>
                </div> 
                : 
                <>
                    <h2 className="header"> 
                        List of positions where
                        <strong> "{carPlate}" </strong> 
                        exceeded speed limit
                    </h2>
                    <div className="violations-map-container">
                        <HelpBar text={
                            segmentCoordinates && segmentCoordinates.length === 0
                            ? "This Car has no violated road segments"
                            : "Select an entry to view the position of violation"
                        }/>

                        <div className="violations-map">
                            <Table TableValues={carViolations[carPlate] || []} setSegmentCoordinates={setSegmentCoordinates}/>
                            <SideMap violatedRoadSegmentedCoordinates={segmentCoordinates} />
                        </div>
                    </div>
                </>}
            </div>
    );
}