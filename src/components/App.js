import React, { useState } from "react";

const API_KEY = "3ff9adfaab2a8b37a6cf83193cb3dec5";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = () => {
    if (!query) return;

    setError("");
    const currentQuery = query; // store input value
    setQuery(""); // clear input immediately for Cypress test

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentQuery}&appid=${API_KEY}&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        setWeather(null);
        setError(err.message);
      });
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

      {(error || weather) && (
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
      )}
    </div>
  );
}

export default App;
