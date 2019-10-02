import { connect } from "react-redux";
import WeatherView from "./WeatherView";

const mapStateToProps = (state) => ({
  icon: state.weather.currentCity.weather[0].icon,
  description: state.weather.currentCity.weather[0].description,
  temp: state.weather.currentCity.main.temp
})

export type ConnectedProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(WeatherView);