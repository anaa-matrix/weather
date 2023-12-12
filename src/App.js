// App.js
import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';
// Import Axios in your component
import axios from 'axios';

const apiKey = '334cba9d918f358829c56b8c422daa25'; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    // Implement API call to fetch weather data here
    // Update the state with the response data
    
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}

export default App;
