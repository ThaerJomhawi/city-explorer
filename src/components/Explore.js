import React, { Component } from "react";

class Explore extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.cityName}</h1>
        <h2>{this.props.lat}</h2>
        <h2>{this.props.lon}</h2>
      </div>
    );
  }
}

export default Explore;
