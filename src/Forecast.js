import React, { useState } from "react";
import CurrentWeather from "./CurrentWeather";

const Forecast = ({ forecast, hourlyData, current, locationDetails }) => {
  const [DaySelected, setDaySelected] = useState(0);

  const selectedDayHours =
    forecast &&
    forecast.length > 0 &&
    forecast[DaySelected].hour.filter((_, index) => index % 3 === 0);

  return (
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
          ? forecast.slice(0, 5).map((day, index) => {
              const date = new Date(day.date);
              const formattedDate = `${date.getDate()}`;

              return (
                <div
                  key={index}
                  class="two wide column"
                  style={{
                    textAlign: "center",
                    border: DaySelected === index ? "2px solid #fff" : "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDaySelected(index)}
                >
                  <p>{`${day.day.maxtemp_c}°C`}</p>
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "5px 0",
                    }}
                  />
                  <p>{` ${formattedDate}`}</p>
                </div>
              );
            })
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
          {selectedDayHours &&
            selectedDayHours.map((hour, index) => (
              <div key={index} class="column">
                <p>{hour.time.split(" ")[1]}</p>
                <p>{`${hour.temp_c}°C`}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
