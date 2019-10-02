import React from "react";
import { ConnectedProps } from "./DefaultCityButtonContainer";
import { Icon, Button } from "antd";
import { ButtonProps } from "antd/lib/button";

type DefaultCityButtonProps = Partial<ConnectedProps> & ButtonProps;

const DefaultCityButton = (props: DefaultCityButtonProps) => {
  return (
    <Button type="primary" shape="round" onClick={props.onClick}>
      {props.isDefaultCity ? (
        <span>
          <Icon type="check" />
          <span> Default city</span>
        </span>
      ) : (
        <span>
          <Icon type="home" />
          <span> Set default city</span>
        </span>
      )}
    </Button>
  );
};

export default React.memo(DefaultCityButton);
