import React from "react";
import { ConnectedProps } from "./WeatherViewContainer";

type WeatherViewContainer = ConnectedProps;

const WeatherView = (props: WeatherViewContainer) => {
  const tempString = props.temp > 0 ? "+" : "";

  return (
    <div className="weather-view">
      <div className="main-info">
        <div>
          <img
            className="icon"
            src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
            alt={props.description}
          />
          <div className="description">{props.description}</div>
        </div>
        <div className="temp">
          {tempString + Math.round(props.temp)} &#8451;
        </div>
      </div>
    </div>
  );
};

export default WeatherView;
