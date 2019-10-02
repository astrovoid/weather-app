import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Dispatch, iRootState } from "../index";

type HomePageProps = connectedProps;

const HomePage = (props: HomePageProps) => {
  const { 
    defaultCity, 
    redirectToDefaultCity, 
    redirectToCityWeather 
  } = props;

  useEffect(() => {
    if (defaultCity) {
      redirectToDefaultCity(defaultCity);
    } else {
      redirectToCityWeather();
    }
  }, [defaultCity, redirectToDefaultCity, redirectToCityWeather]);

  return <Spin tip="Loading..." />;
};

const mapStateToProps = (state: Pick<iRootState, "defaultCity">) => ({
  defaultCity: state.defaultCity
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    test: dispatch.weather,
    redirectToCityWeather: dispatch.geoInfo.redirectToCityWeather,
    redirectToDefaultCity: dispatch.defaultCity.redirectToDefaultCity
  };
};

type connectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export { connected as HomePage };
