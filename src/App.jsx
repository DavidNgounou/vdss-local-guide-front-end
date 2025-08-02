import { useState, useEffect } from 'react'
import Header from './components/header';
import LeafletMap from './components/LeafLetMap';
import Select from 'react-select';
import SpeedLimitControls from './components/SpeedLimitControls/SpeedLimitControls';
import SpeedViolationListView from './components/SpeedViolationListView/SpeedViolationListView';
import { carPlates, carViolations } from './Data/Data';
import { fetchData } from './services/API';

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

const [hRviewState, sethRviewState] = useState(false);
const [highRiskRoads, sethighRiskRoads] = useState([]);

 function handlehRviewChange(){
  sethRviewState(prev=> !prev);
  
}

useEffect(() => {
  if (hRviewState) {
    fetchData(`/api/infractions/stats?date=2025-06-01`)
      .then((response)=> {
        console.log(response);
        sethighRiskRoads(response)
      })
      .catch((error) => {
        console.error("Error fetching high risk road segments");
      });
  } else {
    sethighRiskRoads([]);
    console.log(highRiskRoads);
  }
  console.log('Showing high risk view...' + hRviewState);
}, [hRviewState]);

useEffect(() => {
    fetchData(`/api/cars`)
      .then((response)=> {
        console.log(`List of cars: `, response);
        setCarPlates(response);
      })
      .catch((error)=>{
        console.error("Error fetching List of cars");
      });
  
}, []);

//  const carPlates = [
//         {value: 'OU-618-CJ', label: 'OU-618-CJ'},
//         {value: 'CE-918-CJ', label: 'CE-518-CJ'}
//     ];

  const [carPlate, setCarPlate] = useState(null);
  const [carPlates, setCarPlates] = useState(null);

  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);

  const [selectedView, setSelectedView] = useState(0);



  return <>
      <Header />

      <h1 className="section-title">Inspect Car Traffic</h1>
      <div id="speed-control-section">
        {selectedView === 1 && 
          <SpeedViolationListView
            carPlate={carPlate ? carPlate.label : null} 
            
            />}

        {selectedView === 0 && 
          <LeafletMap
            // listOfroadSegments={
            //   carPlate && carViolations[carPlate.label]
            //     ? carViolations[carPlate.label]
            //     : []
            // }
            highRiskRoads={highRiskRoads}
          />
        }
        <SpeedLimitControls 
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          carPlates={carPlates}
          setCarPlate={setCarPlate}
          carPlate={carPlate}
          hRviewState={hRviewState}
          handlehRviewChange={handlehRviewChange}
        />
      </div>
    </>

}

export default App;