import React, { useCallback } from "react";
import { ConnectedProps } from "./WeatherCardContainer";
import { TimeAgo } from "../TimeAgo";
import { DefaultCityButton } from "../DefaultCityButton";
import { WeatherView } from "../WeatherView";

type WeatherCardProps = ConnectedProps;

const WeatherCard = (props: WeatherCardProps): JSX.Element => {
  const { setDefaultCity, id } = props;

  const memoSetDefaultCity = useCallback(() => setDefaultCity(id), [setDefaultCity, id]);

  return (
    <div className="weather-card">
      <div className="title">
        <h2>{props.cityName}</h2>
        <div className="last-update">
          <span>Last update: </span>
          <TimeAgo />
        </div>
      </div>
      <div className="set-default">
        <DefaultCityButton onClick={memoSetDefaultCity} />
      </div>
      <WeatherView />
    </div>
  );
};

export default WeatherCard;
