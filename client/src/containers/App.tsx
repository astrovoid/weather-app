import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { createRouteNodeSelector } from "redux-router5";
import { State as IRouteState } from "router5";
import { IStore } from "../store/configureStore";
import { Header } from "./Header";
import { AboutPage } from "../pages/AboutPage";
import { WeatherPage } from "../pages/WeatherPage";
import { HomePage } from "../pages/HomePage";
import "antd/dist/antd.css";

interface IStateToProps {
  route: IRouteState;
}

class App extends React.Component<any> {
  private components: {
    [key: string]:
      | React.ComponentClass
      | React.FunctionComponent
      | ConnectedComponent<any, any>;
  } = {
    home: HomePage,
    about: AboutPage,
    weather: WeatherPage
  };

  public render(): JSX.Element {
    const { route } = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section>
        <Header />
        <div className="container">
          <div className="content">
          {segment && this.components[segment] ? (
            React.createElement(this.components[segment])
          ) : (
            <div>Not Found</div>
          )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: Pick<IStore, "router">): IStateToProps => ({
  ...createRouteNodeSelector("")(state)
});

const connected = connect(mapStateToProps)(App);

export { connected as App, App as UnconnectedApp, mapStateToProps };
