import React, { useState } from "react";

const API_KEY = "8c17e587577b053e3f6d429a827f5e8d";

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!query) return;
    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🌤 City Weather App</h1>

      <input
        type="text"
        className="search"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "200px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather}>Search</button>

      <div className="weather" style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weather && (
          <div>
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>🌡 Temperature: {weather.main.temp}°C</p>
            <p>☁ {weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
