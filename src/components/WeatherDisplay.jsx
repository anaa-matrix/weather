import React, { useEffect, useState } from 'react';
import './WeatherDisplay.css';
import axios from 'axios';

const WeatherDisplay = ({ data }) => {
  // Declare state variables outside of conditions
  const [currentTime, setCurrentTime] = useState(null);
  const {
    name,
    coord: { lat, lon },
    main: { temp, humidity },
    weather: [{ description, icon }],
    wind: { speed },
  } = data;

  async function fetchTime() {
    await axios
      .get(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=A46L4D94SL4N&format=json&by=position&lat=${lat}&lng=${lon}`
      )
      .then((response) => {
        const { formatted } = response.data;
        setCurrentTime(formatted);
      })
      .catch((error) => {
        console.error('Error fetching current time:', error);
      });
  }

  useEffect(() => {
    fetchTime();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <div className="weather-info">
        <div className="temperature">
          <p>{Math.round(temp)}°C</p>
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt={description}
          />
        </div>
        <p>Condition: {description}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {speed} m/s</p>
        {currentTime && <p>Current time: {currentTime}</p>}
      </div>
    </div>
  );
};

export default WeatherDisplay;
