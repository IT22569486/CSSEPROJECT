// src/components/AddRoute.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import MapSelector from "./MapSelector"; // Import the MapSelector component

const AddRoute = () => {
  const [drivers, setDrivers] = useState([]);
  const [bins, setBins] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedBins, setSelectedBins] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [startLocation, setStartLocation] = useState(null); // Start location as an array
  const [endLocation, setEndLocation] = useState(null); // End location as an array
  const [optimizedPath, setOptimizedPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState("");

  // Fetch drivers and bins for selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversRes = await axios.get("http://localhost:8070/Driver");
        const binsRes = await axios.get("http://localhost:8070/TrashBin");
        setDrivers(driversRes.data);
        setBins(binsRes.data);
      } catch (error) {
        console.error("Error fetching drivers/bins", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the new route object
    const newRoute = {
      driver: selectedDriver,
      wasteBins: selectedBins,
      optimizedPath: optimizedPath,
      totalDistance: parseFloat(totalDistance),
      routeName,
      startLocation,
      endLocation,
    };

    try {
      await axios.post("http://localhost:8070/Routek/add", newRoute);
      alert("Route added successfully!");
    } catch (error) {
      console.error("Error adding route:", error);
      alert("Failed to add route");
    }
  };

  // Function to handle start location selection
  const handleStartSelect = (location) => {
    setStartLocation(location);
  };

  // Function to handle end location selection
  const handleEndSelect = (location) => {
    setEndLocation(location);
  };

  return (
    <div className="container mt-4">
      <h2>Add Route</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Driver</label>
          <select
            className="form-select"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            required
          >
            <option value="">Select a driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Waste Bins</label>
          <select
            className="form-select"
            multiple
            value={selectedBins}
            onChange={(e) => {
              const value = Array.from(e.target.selectedOptions, (option) => option.value);
              setSelectedBins(value);
            }}
            required
          >
            {bins.map((bin) => (
              <option key={bin._id} value={bin._id}>
                {bin.location.coordinates.join(", ")}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">Hold Ctrl (Windows) or Command (Mac) to select multiple bins.</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Route Name</label>
          <input
            type="text"
            className="form-control"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            required
          />
        </div>

        {/* Map Selector for Start and End Locations */}
        <div className="mb-3">
          <label className="form-label">Select Start and End Locations</label>
          <MapSelector onSelectStart={handleStartSelect} onSelectEnd={handleEndSelect} />
          <small className="form-text text-muted">
            Click on the map to select start and end locations.
          </small>
        </div>

        {/* Display selected start and end locations */}
        <div className="mb-3">
          <label className="form-label">Start Location (lng, lat)</label>
          <input
            type="text"
            className="form-control"
            value={startLocation ? startLocation.join(", ") : ""}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Location (lng, lat)</label>
          <input
            type="text"
            className="form-control"
            value={endLocation ? endLocation.join(", ") : ""}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Optimized Path (lng, lat array)</label>
          <input
            type="text"
            className="form-control"
            value={optimizedPath.join("; ")} // e.g., "lng1, lat1; lng2, lat2"
            onChange={(e) => {
              const path = e.target.value.split(";").map(coord => coord.split(",").map(Number));
              setOptimizedPath(path);
            }}
            placeholder="e.g. lng1,lat1; lng2,lat2"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Distance (km)</label>
          <input
            type="number"
            className="form-control"
            value={totalDistance}
            onChange={(e) => setTotalDistance(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Route</button>
      </form>
    </div>
  );
};

export default AddRoute;
