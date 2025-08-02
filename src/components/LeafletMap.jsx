import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
// import './LeafletMap.css'; // Import the CSS file for the map component

const ORS_API_KEY = '5b3ce3597851110001cf6248e679d2fba7584c40b01932a4eabae362'; // Replace with your API key

const speedColors = {
    20: 'darkred',    // Most critical (lowest speed)
    30: 'red',
    40: 'orange',
    50: 'gold',
    60: 'yellowgreen',
    70: 'green',
    80: 'teal',
    90: 'blue',       // Least critical (highest speed)
}

const LeafletMap = ({ selectedRegion, handlePointChange, inputName, roadSegment, setroadSegment, listOfRoadSegments }) => {
    const mapRef = useRef(null);
    const startMarkerRef = useRef(null);
    const endMarkerRef = useRef(null);
    const routeLayerRef = useRef(null);
    const inputNameRef = useRef(inputName);

    useEffect(() => {
        inputNameRef.current = inputName;
    }, [inputName]);

    // Initialize map only once
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView(selectedRegion.value, 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);

            mapRef.current.on("click", (e) => {
                const point = e.latlng;
                handlePointChange(point, inputNameRef.current);
                setroadSegment((prevState) => ({
                    ...prevState,
                    [inputNameRef.current]: point,
                }));
            });
        } else{
            mapRef.current.setView(selectedRegion.value, 15);
        }
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [selectedRegion]);

    // // Update map view when selectedRegion changes
    // useEffect(() => {
    //     if (mapRef.current) {
    //         mapRef.current.setView(selectedRegion.value, 15);
    //     }
    // }, [selectedRegion]);

    // Update starting and ending point markers

    useEffect(() => {
        if (!mapRef.current) return;

        // Remove previous markers if they exist
        if (startMarkerRef.current) {
            startMarkerRef.current.remove();
            startMarkerRef.current = null;
        }
        if (endMarkerRef.current) {
            endMarkerRef.current.remove();
            endMarkerRef.current = null;
        }

        // Add starting point marker if set
        if (roadSegment.startingPoint) {
            startMarkerRef.current = L.marker(roadSegment.startingPoint, { icon: L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', iconSize: [32, 32], iconAnchor: [16, 32] }) })
                .addTo(mapRef.current)
                .bindPopup('Starting Point')
                .openPopup();
        }

        // Add ending point marker if set
        if (roadSegment.endingPoint) {
            endMarkerRef.current = L.marker(roadSegment.endingPoint, { icon: L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', iconSize: [32, 32], iconAnchor: [16, 32] }) })
                .addTo(mapRef.current)
                .bindPopup('Ending Point')
                .openPopup();
        }

        // If neither is set, show a marker at the selected region
        if (!roadSegment.startingPoint && !roadSegment.endingPoint) {
            startMarkerRef.current = L.marker(selectedRegion.value)
                .addTo(mapRef.current)
                .bindPopup(selectedRegion.label)
                .openPopup();
        }
    }, [roadSegment.startingPoint, roadSegment.endingPoint]);

    // Fetch and display route polyline
    useEffect(() => {
        // Remove previous route layer if it exists
        if (routeLayerRef.current) {
            routeLayerRef.current.remove();
            routeLayerRef.current = null;
        }

        // Only fetch route if both points are set
        if (
            roadSegment.startingPoint &&
            roadSegment.endingPoint &&
            roadSegment.startingPoint.lat &&
            roadSegment.startingPoint.lng &&
            roadSegment.endingPoint.lat &&
            roadSegment.endingPoint.lng
        ) {
            const start = [roadSegment.startingPoint.lng, roadSegment.startingPoint.lat];
            const end = [roadSegment.endingPoint.lng, roadSegment.endingPoint.lat];

            axios
                .post(
                    'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
                    {
                        coordinates: [start, end],
                    },
                    {
                        headers: {
                            Authorization: ORS_API_KEY,
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    const coords = response.data.features[0].geometry.coordinates;
                    // Convert [lng, lat] to [lat, lng] for Leaflet

                    const latlngs = coords.map(([lng, lat]) => [lat, lng]);
                    routeLayerRef.current = L.polyline(latlngs, { color: 'blue', weight: 5 })
                            .addTo(mapRef.current);
                    setroadSegment((prevState) => ({
                        ...prevState,
                        roadSegmentCoordinates: latlngs,
                    }));
                })
                .catch((error) => {
                    console.error('Error fetching route:', error);
                });
        }
    }, [roadSegment.startingPoint, roadSegment.endingPoint]);

    useEffect(() => {
        if (!mapRef.current || !listOfRoadSegments) return;

        // Clear existing road segments
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Polyline) {
                mapRef.current.removeLayer(layer);
            }
        });

        // Add each road segment as a polyline
        listOfRoadSegments.forEach((segment) => {
            if (segment.coordinates && segment.coordinates.length > 0) {
                console.log("displaying road segments", segment.id);
                const latlngs = segment.coordinates;
                const color = speedColors[Math.round(segment.speedLimit/10) * 10] || 'gray'; // Default to gray if speed limit not found
                L.polyline(latlngs, { color: color, weight: 10 })
                    .addTo(mapRef.current)
                    .bindPopup(`
                        <strong>Road Name:</strong> ${segment.name || 'N/A'}
                        <br>
                        <strong>Speed Limit:</strong> ${segment.speedLimit} km/h
                        `);

            }
        });
    }, [listOfRoadSegments, mapRef.current]);   

    return <div id="map"></div>;
};

export default LeafletMap;
// ````css
// /* LeafletMap.css */
// #map {
//   height: 400px;
//   width: 100%;
// }
// ```