import React, { Component } from "react";
import Explore from "./components/Explore";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Weather from "./components/Weather";
import Movies from "./components/Movies";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lon: "",
      cityName: "",
      mapShow: false,
      displayError: false,
      errorMsg: "",
      weatherData: [],
      movieData: [],
    };
  }

  getUserInputHandler = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LocationKey}&q=${this.state.cityName}&format=json`;
    axios
      .get(url)
      .then((res) => {
        let data = res.data[0];

        this.setState({
          cityName: data.display_name,
          lat: data.lat,
          lon: data.lon,
          mapShow: true,
          displayError: false,
          errorMsg: "",
        });
      })
      .then(() => {
        let weatherApiUrl = `${process.env.REACT_APP_BACKEND_URL}/weather/${this.state.lat}/${this.state.lon}`;
        axios.get(weatherApiUrl).then((res) => {
          this.setState({
            weatherData: res.data,
          });
        });
      })
      .then(() => {
        let cityName = this.state.cityName.split(",")[0];
        let movieApiUrl = `${process.env.REACT_APP_BACKEND_URL}/movie/${cityName}`;
        axios.get(movieApiUrl).then((res) => {
          this.setState({
            movieData: res.data,
          });
        });
      })
      .catch((error) => {
        this.setState({
          errorMsg: error,

          displayError: true,
        });
      });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            {this.state.displayError && (
              <Alert key={1} variant={"danger"}>
                City not Found
              </Alert>
            )}
          </Row>
          <Row>
            {" "}
            <div style={{ margin: "20px" }}>
              <Form onSubmit={(e) => this.submitHandler(e)}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCity"
                  style={{ display: "flex" }}
                >
                  <Form.Control
                    onChange={(e) => {
                      this.getUserInputHandler(e);
                    }}
                    type="text"
                    placeholder="Enter a City name ..."
                    style={{ width: "300px" }}
                  />
                  <Button variant="primary" type="submit">
                    Explore!
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Row>
          {this.state.mapShow && (
            <Row>
              <Col>
                <div style={{ padding: "20px" }}>
                  <Explore
                    cityName={this.state.cityName}
                    lat={this.state.lat}
                    lon={this.state.lon}
                  />
                </div>
              </Col>
              <Col>
                {this.state.weatherData && (
                  <>
                    {this.state.weatherData.map((idx) => {
                      return (
                        <Weather
                          date={idx.date}
                          description={idx.description}
                        />
                      );
                    })}
                  </>
                )}
              </Col>
            </Row>
          )}

          {this.state.movieData && (
            <Row>
              <>
                {this.state.movieData.map((itm) => {
                  return (
                    <Movies
                      title={itm.title}
                      overview={itm.overview}
                      averageVotes={itm.vote_average}
                      totalVotes={itm.vote_count}
                      imageUrl={itm.poster_path}
                      popularity={itm.popularity}
                      releasedOn={itm.release_date}
                    />
                  );
                })}
              </>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
