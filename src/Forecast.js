import React from "react";
import CurrentWeather from "./CurrentWeather";

const Forecast = ({ forecast, hourlyData, current, locationDetails }) => (
  <div>
    <CurrentWeather
      current={current}
      locationDetails={locationDetails}
      hourlyData={hourlyData}
    />
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

export default Forecast;
