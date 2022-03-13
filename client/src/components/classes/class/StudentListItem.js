import React, { Component } from "react";

export default class StudentListItem extends Component {
  render() {
    const { name } = this.props.student;
    const { first_name, last_name } = name;
    return (
      <li className="list-group-item m-1">
        {first_name} {last_name ? <>{last_name}</> : null}
      </li>
    );
  }
}
