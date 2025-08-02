import { useRef, useEffect } from "react";
import L from 'leaflet';
import './SideMap.css';

export default function SideMap(
    { 
        violatedRoadSegmentedCoordinates = []
    }) {
    
    
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const polylineRef = useRef(null);

    console.log("Violated Road Segmented Coordinates:", violatedRoadSegmentedCoordinates);
    useEffect(() => {
        if( violatedRoadSegmentedCoordinates.length === 0) {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            return;
        }
        if (!mapRef.current && mapContainerRef.current && violatedRoadSegmentedCoordinates.length > 0) {
            const centerIndex = Math.floor(violatedRoadSegmentedCoordinates.length / 2);
            const center = violatedRoadSegmentedCoordinates[centerIndex];

            mapRef.current = L.map(mapContainerRef.current).setView(center, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);
        }

        // Remove old polyline if it exists
        if (polylineRef.current && mapRef.current) {
            mapRef.current.removeLayer(polylineRef.current);
        }

        // Add new polyline
        if (mapRef.current && violatedRoadSegmentedCoordinates.length > 0) {
            polylineRef.current = L.polyline(violatedRoadSegmentedCoordinates, {
                color: 'blue',
                weight: 5,
                opacity: 0.7
            }).addTo(mapRef.current);

            // Optionally fit bounds
            mapRef.current.fitBounds(polylineRef.current.getBounds());
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [violatedRoadSegmentedCoordinates]);

    return (
        <div id="side-map" ref={mapContainerRef} >
            <h4>
                Select an entry in the table 
                <br/>
                to see to view on the map
            </h4>
        </div>
    );
}