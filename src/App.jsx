import { useEffect, useState } from 'react';
import Header from './components/header';
import LeafletMap from './components/LeafletMap';
import RoadIcon from './assets/svgcomponents/RoadIcon';
import TabButton from './components/TabButton';
import AnalysisIcon from './assets/svgcomponents/AnalysisIcon';
import RoadSegmentTab from './components/RoadSegmentTab/RoadSegmentTab';
import RoadAnalysisTab from './components/RoadAnalyisTab/RoadAnalysisTab';
import Select from 'react-select';

import { roadSegmentList as roadSegments} from '../data/Data.js'; // Adjust the import path as necessary
import { fetchData } from '../services/API.js';

function App() {
  
  const regionOptions = [
    { value: [5.3757, 10.4133], label: "Bandjoun" },
    { value: [5.4778, 10.4176], label: "Bafoussam" },
    { value: [3.8667, 11.5167], label: "Yaounde" },
    { value: [4.0483, 9.7043], label: "Douala" },
    { value: [4.0236, 9.2061], label: "Limbe" },
    { value: [4.1527, 9.2410], label: "Buea" },
    { value: [5.4440, 10.0533], label: "Dschang" },
    { value: [5.1571, 10.1771], label: "Bafang" },
    { value: [4.9547, 9.9404], label: "Nkongsamba" },
    { value: [2.9000, 11.1500], label: "Ebolowa" },
    { value: [4.5773, 13.6846], label: "Bertoua" },
    { value: [10.5910, 14.3159], label: "Maroua" },
    { value: [9.3014, 13.3977], label: "Garoua" },
    { value: [7.3277, 13.5847], label: "Ngaoundere" },
    { value: [6.7497, 11.8037], label: "Banyo" },
    { value: [10.7424, 13.8023], label: "Mokolo" },
    { value: [10.3411, 15.2329], label: "Yagoua" },
    { value: [4.6363, 9.4469], label: "Kumba" },
];
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 10, // Set the z-index to 10
    }),
  };

  const [fieldName, setFieldName] = useState("startingPoint");
  const [activeTab, setactiveTab] = useState([true, false]);
  const [point, setPoint] = useState({ lat: 0, lng: 0 });

  // Tab button click handler
  const handleTabClick = (index) => {
    setactiveTab((prevState) => {
      const newState = [...prevState.map((item) => false)];
      newState[index] = true;
      return newState;
    });
  }

  // road segment form values
  const [roadSegment, setroadSegment] = useState({
    startingPoint: "",
    endingPoint: "",
    name: "",
    speedLimit: "",
    roadSegmentCoordinates: [],
    roadSegmentId: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setroadSegment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePointChange = (point, name) => {
    setroadSegment((prevState) => ({
      ...prevState,
      [name]: point,
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(roadSegment);

  }

  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);

  const [ selectedTimePeriod, setSelectedTimePeriod ] = useState(0);
  console.log("Selected time period:", selectedTimePeriod);
  function handleTimePeriodChange(index) {
    setSelectedTimePeriod( index);
    if(index === 0) {
      setHelpText("You are viewing data for all time periods.");
    }
    if(index === 1) {
      setHelpText("You are viewing data for today.");
    }
    if(index === 2) {
      setHelpText("You are viewing data for the last month.");
    }
    if(index === 3) {
      setHelpText("You are viewing data for the last year.");
    }
  }
  const [ roadSegmentList, setRoadSegmentList ] = useState([]);
  

  const handleRegionChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
  }

   const [speedLimitButtons, setSpeedLimitButtons] = useState(0);
    const [helpText, setHelpText] = useState("");

    const activeFormButton = speedLimitButtons === 0 ? "startingPoint" : "endingPoint";

    useEffect(() => {
      // Fetch road segments data from the API
      if (roadSegmentList.length > 0) return;
      
      // Avoid fetching if already fetched
      console.log("Fetching road segments data...");
      // Fetch data from the API
      fetchData("/api/road-segments/all")
        .then((data) => {
          console.log("Fetched road segments:", data);
          setRoadSegmentList(data);
        })
        .catch((error) => {
          console.error("Error fetching road segments:", error);
        });
    }, [selectedTimePeriod]);
    
  return <>
      <Header />

      <h1 className="section-title">Manage Speed Limit</h1>

      <div id="region-input">
        <label> Select a region </label>
        <Select
          options={regionOptions}
          styles={customStyles}
          onChange={handleRegionChange}
          value={selectedRegion}
        />
      </div>
      <div id="speed-control-section">
      {/* <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15889.570816054775!2d10.4284185!3d5.356897499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2scm!4v1745707470335!5m2!1sen!2scm" ></iframe> */}
      <LeafletMap 
          selectedRegion={selectedRegion} 
          setPoint={setPoint} 
          handlePointChange={handlePointChange} 
          inputName={activeFormButton} 
          roadSegment={roadSegment} 
          setroadSegment={setroadSegment} 
          listOfRoadSegments={roadSegmentList}
        />
        <div id="speed-limit-controls">
          <div className="tab-buttons">
            <TabButton 
              icon={<RoadIcon fillColor = {activeTab[0] ? "white" : "#4285F4" }/>} 
              onClick={() => {handleTabClick(0)}}
              isActive={ activeTab[0] } 
              >
              Configure road segment
            </TabButton>
            <TabButton 
              icon={<AnalysisIcon fillColor = {activeTab[1] ? "white" : "#4285F4" }/>} 
              onClick={() => {handleTabClick(1)}}
              isActive={ activeTab[1] } 
              >
              Road Analytics
            </TabButton>
          </div>
            
          
          {activeTab[0] && 
            <RoadSegmentTab 
              point={point} 
              roadSegment={roadSegment} 
              setroadSegment={setroadSegment} 
              speedLimitButtons={speedLimitButtons} 
              setSpeedLimitButtons={setSpeedLimitButtons} 
              activeFormButton={activeFormButton}
            />}
          {activeTab[1] 
            && <RoadAnalysisTab 
                  onClick={handleTabClick}  
                  setSelectedButton={setSelectedTimePeriod}
                  selectedButton={selectedTimePeriod}    
          />}
          
         
        </div>
      </div>
    </>

}

export default App