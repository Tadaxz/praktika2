import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "d5bc14a103f94367894115431250805";
  const location = "Panevėžys";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key= ${apiKey}&q=${location}`
        );
        const currentData = currentResponse.data;
        const forecastResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key= ${apiKey}&q=${location}&days=14`
        );
        const forecastData = forecastResponse.data;
        const combinedData = {
          current: currentData.current,
          forecast: forecastData.forecast.forecastday,
          location: currentData.location,
        };

        setWeatherData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [apiKey, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>No data available.</div>;
  }

  const { current, location: locationDetails, forecast } = weatherData;
  const hourlyData = forecast && forecast.length > 0 ? forecast[0].hour : [];

  //current
  const CurrentWeather = () => (
    <div
      class="ui two column centered grid"
      style={{
        padding: "20px",
        justifyContent: "center",
      }}
    >
      <div>
        <h2>{locationDetails.name}</h2>
        <p>{current.last_updated.split(" ")[1]}</p>
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          style={{
            width: "50px",
            height: "50px",
            margin: "10px 0",
          }}
        />
        <p>{current.condition.text}</p>
        <div class="ui equal width grid">
          <p class="column">Humidity: {current.humidity}%</p>
          <p class="column">Pressure: {current.pressure_mb}</p>
          <p class="column">Sea level: {current.pressure_mb}</p>
          <p class="column">Feels Like: {current.feelslike_c}°C</p>
        </div>
        <div class="ui equal width grid">
          {hourlyData
            .filter((_, index) => index % 5 === 0)
            .map((hour, index) => (
              <div key={index} class="column">
                <p>{hour.time.split(" ")[1]}</p>
                <p>{`${hour.temp_c}°C`}</p>
              </div>
            ))}
        </div>
      </div>
      <div
        style={{
          justifyContent: "center",
          padding: "50px",
          margin: "20px",
        }}
      >
        <h1>{`${current.temp_c}°C`}</h1>
      </div>
    </div>
  );

  //Forecast
  const Forecast = () => (
    <div>
      <CurrentWeather />
      <div
        class="ui grid"
        style={{
          justifyContent: "center",
          padding: "10px",
          gap: "20px",
        }}
      >
        {forecast && forecast.length > 0
          ? forecast.slice(0, 5).map((day, index) => (
              <div key={index} class="two wide column">
                <p>{`${day.day.maxtemp_c}°C`}</p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                />
              </div>
            ))
          : null}
      </div>
      <div
        class="ui grid"
        style={{
          overflowX: "auto",
          padding: "10px",
          justifyContent: "space-between",
        }}
      >
        <div class="row">
          {hourlyData
            .filter((_, index) => index % 3 === 0)
            .map((hour, index) => (
              <div key={index} class="column">
                <p>{hour.time.split(" ")[1]}</p>
                <p>{`${hour.temp_c}°C`}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1514477917009-389c76a86b68 ')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "20px", color: "#fff" }}>
            Current Forecast
          </Link>
          <Link to="/forecast" style={{ color: "#fff" }}>
            5 Day Forecast
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/forecast" element={<Forecast />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
