import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class Explore extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LocationKey}&center=${this.props.lat},${this.props.lon}&zoom=1-18`}
            alt="Map"
            width="300px"
          />

          <Card.Body>
            <Card.Title>City Name: {this.props.cityName}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Coordinates:</ListGroupItem>
            <ListGroupItem>Latitude: {this.props.lat}</ListGroupItem>
            <ListGroupItem>Longitude: {this.props.lon}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default Explore;
