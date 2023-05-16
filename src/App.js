import "./App.css";

import React, { Component } from "react";
import Navbar from "./components.js/Navbar";
import News from "./components.js/News";
export default class App extends Component {
  c = "john";
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={10} country="in" category="science" />

        {/* <News pageSize={10}/>  this is the method i have done in starting but it didn't applied*/}
      </div>
    );
  }
}
