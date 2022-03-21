import React, { Component } from "react";

export default class AttendanceHeader extends Component {
  render() {
    const last_n_days = this.props.last_n_days;
    return (
      <>
        <tr>
          <th scope="col">S.No</th>

          <th scope="col">Name</th>
          {last_n_days.map((day) => (
            <th scope="col" className="text-center" key={day}>
              {day}
            </th>
          ))}
        </tr>
      </>
    );
  }
}
