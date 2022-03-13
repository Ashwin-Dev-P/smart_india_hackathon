import React, { Component } from "react";

export default class StudentAttendanceListItem extends Component {
  render() {
    const { name, _id } = this.props.student;
    const { first_name, last_name } = name;
    return (
      <label htmlFor={_id}>
        <li className="list-group-item m-1">
          <div className="row">
            <div className="col-xs-11 col-lg-11 text-left">
              <span className="text-left float-left">
                {first_name} {last_name ? <>{last_name}</> : null}{" "}
              </span>
            </div>
            <div className="col-xs-1 col-lg-1">
              <span className="">
                <input type="checkbox" name="present" id={_id} />
              </span>
            </div>
          </div>
        </li>
      </label>
    );
  }
}
