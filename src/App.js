import React, { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import CurrentWeather from "./CurrentWeather";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "d5bc14a103f94367894115431250805";
  const location = "Panevėžys";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const forecastResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key= ${apiKey}&q=${location}&days=14`
        );
        const forecastData = forecastResponse.data;
        const combinedData = {
          current: forecastData.current,
          forecast: forecastData.forecast.forecastday,
          location: forecastData.location,
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
          <Route
            path="/"
            element={
              <CurrentWeather
                current={current}
                locationDetails={locationDetails}
                hourlyData={hourlyData}
              />
            }
          />
          <Route
            path="/forecast"
            element={
              <Forecast
                forecast={forecast}
                hourlyData={hourlyData}
                current={current}
                locationDetails={locationDetails}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
