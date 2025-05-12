import React from "react";

const CurrentWeatherHead = ({ current, locationDetails }) => (
  <div>
    <div
      class="ui grid"
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
  </div>
);
export default CurrentWeatherHead;
