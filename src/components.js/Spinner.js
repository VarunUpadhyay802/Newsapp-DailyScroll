import React, { Component } from "react";
import dog_running from "./dog_running.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={dog_running} alt="loading" width="50" height="50" />
      </div>
    );
  }
}

export default Spinner;
