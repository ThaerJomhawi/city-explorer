import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class Movies extends Component {
  render() {
   
    return (
      <div>
        <Card style={{ width: "30rem", marginBottom: "10px" }}>
          <Card.Img
            variant="top"
            src={this.props.imageUrl}
            alt="Map"
            
          />

          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Over View: {this.props.overview}</ListGroupItem>
            <ListGroupItem>Avg Votes: {this.props.averageVotes}</ListGroupItem>
            <ListGroupItem>Total Votes: {this.props.vote_count}</ListGroupItem>
            <ListGroupItem>Popularity: {this.props.popularity}</ListGroupItem>
            <ListGroupItem>Released: {this.props.releasedOn}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default Movies;
