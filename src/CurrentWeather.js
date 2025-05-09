import React from "react";

const CurrentWeather = ({ current, locationDetails, hourlyData }) => (
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
          .filter((_, index) => index % 4 === 0)
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

export default CurrentWeather;
