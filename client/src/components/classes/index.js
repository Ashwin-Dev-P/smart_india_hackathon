import React, { Component } from "react";
import { Link } from "react-router-dom";

//components
import Classes from "./Classes";

export default class index extends Component {
  render() {
    return (
      <div>
        <h2 className="myHeading">Select your class</h2>

        <div className="row justify-content-center class-crud-buttons-div">
          <div className="col-xs-12 col-md-6 col-lg-3 text-center">
            <Link to="/add_class" className="btn btn-primary">
              <i className="fa fa-plus" aria-hidden="true"></i> Add class
            </Link>
          </div>
        </div>
        <div>
          <Classes />
        </div>
      </div>
    );
  }
}
