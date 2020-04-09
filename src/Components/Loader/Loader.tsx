import React from "react";
import "./Loader.css";

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loaderContainer">
        <div className="small" />
        <div className="medium" />
        <div className="large" />
      </div>
    );
  }
}
