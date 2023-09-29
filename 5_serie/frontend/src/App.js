import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function City({ city }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cityDetails, setCityDetails] = useState(null);

  const fetchCityDetails = async (cityId) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/city/${cityId}`);
    setCityDetails(response.data);
  };

  useEffect(() => {
    if (isOpen) {
      fetchCityDetails(city.id);
    }
  }, [isOpen]);

  return (
    <div className={`city ${isOpen ? 'open' : ''}`}>
      <div className="city-name" onClick={() => setIsOpen(!isOpen)}>
        {city.name}
      </div>
      {isOpen && cityDetails && (
        <div className="city-details">
          <h2>{cityDetails.name}</h2>
          <p>{cityDetails.description}</p>
          <img src={cityDetails.image} alt={cityDetails.name} />
          <p><strong>Most Famous Tourist Attraction:</strong> {cityDetails.famousAttraction}</p>
          <p><strong>Best Time to Visit:</strong> {cityDetails.bestTimeToVisit}</p>
          <p><strong>Population:</strong> {cityDetails.population}</p>
          <p><strong>Area:</strong> {cityDetails.area}</p>
          <p><strong>Time Zone:</strong> {cityDetails.timeZone}</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/cities`).then((response) => {
      setCities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>City List</h1>
      <div className="city-list">
        {cities.map((city, index) => (
          <City key={index} city={city} />
        ))}
      </div>
    </div>
  );
}

export default App;
