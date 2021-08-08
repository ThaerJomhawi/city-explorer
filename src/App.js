import React, { Component } from "react";
import Explore from "./components/Explore";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lon: "",
      cityName: "",
      // alertError: " ",
    };
  }

  getUserInputHandler = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let url = `https://eu1.locationiq.com/v1/search.php?key=pk.273e78dd71a98f0da4149ed2d786eb7b&q=${this.cityName}&format=json`;
    axios.get(url).then((res) => {
      let data = res.data[0];

      this.setState({
        cityName: data.display_name,
        lat: data.lat,
        lon: data.lon,
      });
    });
    // .catch((err) => {
    //   console.log(err);
    //   this.setState({
    //     alertError: "error",
    //   });
    // });
  };

  render() {
    return (
      <div>
        <h1>Search for a City </h1>
        <form onSubmit={(e) => this.submitHandler(e)}>
          <input
            type="text"
            onChange={(e) => {
              this.getUserInputHandler(e);
            }}
            placeholder="Enter a City name ... "
          />
          <input type="submit" value="Explore!" />
        </form>

        <Explore
          cityName={this.state.cityName}
          lat={this.state.lat}
          lon={this.state.lon}
        />
        <div>
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.273e78dd71a98f0da4149ed2d786eb7b&center=${this.state.lat},${this.state.lon}&zoom=1-18`}
            alt="Map"
            width="300px"
          />
        </div>
      </div>
    );
  }
}

export default App;
