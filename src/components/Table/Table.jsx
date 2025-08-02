import './Table.css';
import location from '../../assets/location.svg';
import speedLimitIcon from '../../assets/speedLimitIcon.svg';
import circSpeedometer from '../../assets/circSpeedometer.svg';
import clock from '../../assets/clockIcon.svg';
export default function Table({ TableValues, setSegmentCoordinates }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <p>SN</p>
                    </th>
                    <th>
                        <img src={location} alt="Location Icon" />
                        <p>Location</p>
                    </th>
                    <th>
                        <img src={speedLimitIcon} alt="Speed Icon" />
                        <p>Region Speed Limit</p>
                    </th>
                    <th>
                        <img src={circSpeedometer} alt="Speedometer Icon" />
                        <p>Car's speed</p>  
                    </th>
                    <th>
                        <img src={clock} alt="Clock Icon" />
                        <p>Time of Violation</p>  
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    TableValues && TableValues.length > 0 && TableValues.map((value, index) => (
                        <tr key={new Date(value.datetime).toLocaleString()}
                            onClick={() => {
                                // Handle row click if needed
                                setSegmentCoordinates(value.coordViolatedSegment);
                            }}
                        >
                            <td>{index + 1}</td>
                            <td>{value.nameOfLocation}</td>
                            <td>{value.setSpeed}Km/h</td>
                            <td>{value.runningSpeed}Km/h</td>
                            <td>{new Date(value.datetime).toLocaleString()}</td>
                            {console.log("Coordinates:", value.coordViolatedSegment)}
                        </tr>
                    ))
                }
                {/* <tr>
                    <td>1</td>
                    <td>Baf (MTN House)</td>
                    <td>120Km/h</td>
                    <td>120Km/h</td>
                    <td>Monday 07 at 11:30:00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Location B</td>
                    <td>130Km/h</td>
                    <td>130Km/h</td>
                    <td>2023-10-02</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Location B</td>
                    <td>130Km/h</td>
                    <td>130Km/h</td>
                    <td>2023-10-02</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Location B</td>
                    <td>130Km/h</td>
                    <td>130Km/h</td>
                    <td>2023-10-02</td>
                </tr> */}
                {/* <!-- More rows can be added here --> */}
            </tbody>
        </table>
    );

}