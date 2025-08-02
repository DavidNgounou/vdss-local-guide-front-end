import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ listOfroadSegments, highRiskRoads }) => {
    const mapRef = useRef(null);
    const polylinesRef = useRef([]);

    // Helper to flatten all coordinates for bounds
    const getAllCoordinates = (segments, key = 'coordViolatedSegment') =>
        segments.flatMap(
            seg => seg[key] && Array.isArray(seg[key]) ? seg[key] : []
        );

    useEffect(() => {
        
        console.log("Checking presence of highRiskRoads.", highRiskRoads);
        console.log("Length of highRiskRoads: ", highRiskRoads.length);
        // Initialize map only once
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([5, 0], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);
        }

        // Remove old polylines
        polylinesRef.current.forEach(polyline => mapRef.current.removeLayer(polyline));
        polylinesRef.current = [];
        let maxCount = null;
        let segments = [];
        let key = 'coordViolatedSegment';
        let popupContent = seg =>
            `<strong>${seg.nameOfLocation}</strong><br>
            Speed Limit: ${seg.setSpeed} Km/h<br>
            Car Speed: ${seg.runningSpeed} Km/h<br>
            Time of Violation: ${new Date(seg.datetime).toLocaleString()}`;

        if (highRiskRoads && highRiskRoads.length > 0) {
            maxCount = Math.max(...highRiskRoads.map(segment=>segment.violationCount));
            console.log(`Displaying maxcount: ${maxCount}`);
            segments = highRiskRoads;
            key = 'roadCoordinates';
            popupContent = seg =>
                `<strong>${seg.segmentName}</strong><br>
                Violation Count: ${seg.violationCount}`;
        } else if (listOfroadSegments && listOfroadSegments.length > 0) {
            segments = listOfroadSegments;
        }

        // Add new polylines
        segments.forEach(seg => {
            if (seg && seg[key] && seg[key].length > 0) {
                const polyline = L.polyline(seg[key], {
                    color: maxCount ? 'red' : 'blue',
                    weight: 5,
                    opacity: maxCount && seg.violationCount ? seg.violationCount / maxCount : 0
                }).addTo(mapRef.current)
                .bindPopup(popupContent(seg));
                console.log(`Opacity ${seg.violationCount} / ${maxCount} :  ${maxCount && seg.violationCount ? seg.violationCount / maxCount : 0}`);
                polylinesRef.current.push(polyline);

                // Open a standalone popup at the middle point
                const midIdx = Math.floor(seg[key].length / 2);
                L.popup({ closeOnClick: false, autoClose: false })
                    .setLatLng(seg[key][midIdx])
                    .setContent(popupContent(seg))
                    .addTo(mapRef.current);
            }
        });

        // Fit bounds to all coordinates if available
        const allCoords = getAllCoordinates(segments, key);
        if (allCoords.length > 0) {
            const bounds = L.latLngBounds(allCoords);
            mapRef.current.fitBounds(bounds);
        }

        // Cleanup only on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [listOfroadSegments, highRiskRoads]);

    return (
        <div id="map" />
    );
};

export default LeafletMap;