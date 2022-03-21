import React, { Component } from "react";

import AttendanceRow from "./AttendanceRow";
import AttendanceTableHead from "./AttendanceTableHead";

export default class AttendanceTable extends Component {
  render() {
    const { last_n_days, students_list } = this.props;
    return (
      <div className="table-responsive">
        <table className="table myBorder" id="attendance_table">
          <thead>
            <AttendanceTableHead last_n_days={last_n_days} />
          </thead>
          <tbody>
            {students_list.map((student, index) => (
              <AttendanceRow
                student={student}
                key={student._id}
                index={index}
                length={last_n_days.length}
                days_list={last_n_days}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
