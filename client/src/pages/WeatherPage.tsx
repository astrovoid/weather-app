import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { partUrlToString } from "../helpers/utils";
import { Dispatch } from "../index";
import { WeatherCard } from "../components/WeatherCard";

const AUTOUPDATE_TIME = 60000 * 5;

type WeatherPageProps = connectedProps;

const WeatherPage = (props: WeatherPageProps) => {
  const { city, requestCityWeather, currentCityWeather } = props;
  const { isLoading, isInitialized } = currentCityWeather;

  useEffect(() => {
    requestCityWeather({
      params: {
        q: partUrlToString(city)
      }
    });
    const intervalId = setInterval(() => {
      requestCityWeather({
        params: {
          q: partUrlToString(city)
        }
      });
    }, AUTOUPDATE_TIME);

    return () => clearInterval(intervalId);
  }, [city, requestCityWeather]);

  return <div>{isLoading || !isInitialized ? <Spin tip="Loading..." /> : <WeatherCard />}</div>;
};

const mapStateToProps = (state) => ({
  currentCityWeather: state.weather,
  city: state.router.route.params.city
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestCityWeather: dispatch.weather.requestCityWeather
});

type connectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherPage);

export { connected as WeatherPage };
