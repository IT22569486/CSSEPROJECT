// src/components/MapSelector.js
import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = { lat: 6.9271, lng: 79.8612 }; // Default center (Colombo)

const MapSelector = ({ onSelectStart, onSelectEnd }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC3JCnqz0QDdjmQ8B-76QxGT9sZ1KFu7dY', // Replace with your actual API key
  });

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  const handleMapClick = (event) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // If no start location is set, set it
    if (!startLocation) {
      setStartLocation(clickedLatLng);
      if (onSelectStart) {
        onSelectStart([clickedLatLng.lng, clickedLatLng.lat]); // Pass the location to parent
      }
    } 
    // If start location is set but end location is not, set it
    else if (!endLocation) {
      setEndLocation(clickedLatLng);
      if (onSelectEnd) {
        onSelectEnd([clickedLatLng.lng, clickedLatLng.lat]); // Pass the location to parent
      }
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      onClick={handleMapClick} // Handle map clicks
    >
      {startLocation && (
        <Marker position={startLocation} title="Start Location" />
      )}
      {endLocation && (
        <Marker position={endLocation} title="End Location" />
      )}
    </GoogleMap>
  );
};

export default MapSelector;
