import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
export default class Loading extends Component {
  render() {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }
}
