import * as React from "react";
import { ConnectedLink } from "react-router5";
import { SearchBar } from "../components/SearchBar";
import { Logo } from "../components/Logo";

export class Header extends React.Component<any> {
  public render(): JSX.Element {
    return (
      <div className="header">
        <div className="container">
          <div className="header-content">
            <ConnectedLink routeName="home">
              <Logo />
            </ConnectedLink>
            <SearchBar />
            <ConnectedLink className="about-button"routeName="about">About</ConnectedLink>
          </div>
        </div>
      </div>
    );
  }
}