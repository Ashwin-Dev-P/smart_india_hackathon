import React, { Component } from "react";

//utils
import GetTimeStampOfSelectedDay from "../../../utils/DateTime/GetTimeStampOfSelectedDay";

function AttendanceDatum(length, student, days_list) {
  const days_present = student.days_present;
  var days_list_timestamp = [];

  for (var index = 0; index < days_list.length; index++) {
    const timestamp = GetTimeStampOfSelectedDay(days_list[index]);

    days_list_timestamp.push(timestamp);
  }

  var array = days_list_timestamp;

  if (length > 0) {
    return array.map(function (day, index) {
      if (days_present.includes(day)) {
        return (
          <td key={index} className="text-center green-color">
            <i className="fa fa-check" aria-hidden="true"></i>
          </td>
        );
      } else {
        return (
          <td key={index} className="text-center red-color">
            <i className="fa fa-close" aria-hidden="true"></i>
          </td>
        );
      }
    });
  } else {
    return [];
  }
}

export default class AttendanceRow extends Component {
  render() {
    const { days_list } = this.props;
    const { name } = this.props.student;
    const { first_name, last_name } = name;
    const { index, length } = this.props;

    const table_data = AttendanceDatum(length, this.props.student, days_list);

    return (
      <>
        <tr>
          <th scope="row">{index + 1}</th>
          <td>
            {first_name} {last_name}
          </td>
          {table_data}
        </tr>
      </>
    );
  }
}
