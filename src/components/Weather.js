import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class Weather extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "30rem" }}>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Weather</ListGroupItem>
            <ListGroupItem>{this.props.date}</ListGroupItem>
            <ListGroupItem>{this.props.description}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default Weather;
