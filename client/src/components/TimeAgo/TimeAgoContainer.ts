import { connect } from "react-redux";
import TimeAgo from "./TimeAgo";

const mapStateToProps = (state) => ({
  lastWeatherUpdate: state.weather.lastUpdate
})

export type TimeAgoProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(TimeAgo)