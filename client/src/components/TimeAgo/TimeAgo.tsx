import React from "react";
import { useTimeAgo } from "../../helpers/hooks";
import { TimeAgoProps } from "./TimeAgoContainer";

const TimeAgo = (props: TimeAgoProps): JSX.Element => {
  const { lastWeatherUpdate } = props;
  const timeago = useTimeAgo(lastWeatherUpdate, {});

  return (
    <span>
      {timeago}
    </span>
  )
};

export default TimeAgo;