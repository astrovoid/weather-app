import { connect } from "react-redux";
import WeatherCard from "./WeatherCard";
import { Dispatch } from "../../index";

const mapStateToProps = (state) => ({
  cityName: state.weather.currentCity.name,
  id: state.weather.currentCity.id
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDefaultCity: dispatch.defaultCity.setDefaultCity
})

export type ConnectedProps = ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard)