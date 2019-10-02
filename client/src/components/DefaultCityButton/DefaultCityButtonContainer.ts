import { connect } from "react-redux";
import DefaultCityButton from "./DefaultCityButton";

const mapStateToProps = state => ({
  isDefaultCity: state.defaultCity === (state.weather.currentCity && state.weather.currentCity.id)
});

export type ConnectedProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(DefaultCityButton);
