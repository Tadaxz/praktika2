import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1967&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ')`,
        minHeight: "100vh",
        fontWeight: "bold",
      }}
    >
      <div // current
        class="ui two column centered grid"
        style={{
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <div>
          <h2 style={{ margin: "0" }}>{locationDetails.name}</h2>
          <p style={{ margin: "5px 0" }}>
            {current.last_updated.split(" ")[1]}
          </p>
          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            style={{
              width: "50px",
              height: "50px",
              margin: "10px 0",
            }}
          />
          <p style={{ margin: "5px 0" }}>{current.condition.text}</p>
        </div>
        <div>
          <h1
            style={{ margin: "0", fontSize: "48px" }}
          >{`${current.temp_c}°C`}</h1>
        </div>
      </div>
      <div // 5 day
        class="ui grid"
        style={{
          justifyContent: "space-between",
          padding: "10px",
          gap: "25px",
        }}
      >
        {forecast && forecast.length > 0
          ? forecast.slice(0, 5).map((day, index) => (
              <div key={index} class="three wide column">
                <p>{`${day.day.maxtemp_c}°C`}</p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                />
              </div>
            ))
          : null}
      </div>
      <div // Hourly
        className="ui grid"
        style={{
          overflowX: "auto",
          padding: "10px",
          gap: "180px",
          justifyContent: "space-between",
        }}
      >
        <div className="row">
          {" "}
          {hourlyData
            .filter((_, index) => index % 3 === 0)
            .map((hour, index) => (
              <div key={index} className="column">
                <p>{hour.time.split(" ")[1]}</p>
                <p>{`${hour.temp_c}°C`}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
