import React, { Component } from "react";

export default class StudentAttendanceListItem extends Component {
  constructor(props) {
    super(props);

    this.toggleCheck = this.toggleCheck.bind(this);

    const { days_present } = this.props.student;
    const current_date_timestamp = this.props.current_date_timestamp;

    var checked;
    if (days_present && days_present.includes(current_date_timestamp)) {
      checked = true;
    } else {
      checked = false;
    }

    this.state = {
      checked: checked,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.current_date_timestamp !== this.props.current_date_timestamp
    ) {
      const { days_present } = this.props.student;
      const current_date_timestamp = this.props.current_date_timestamp;

      var checked;
      if (days_present && days_present.includes(current_date_timestamp)) {
        checked = true;
      } else {
        checked = false;
      }

      this.setState({
        checked: checked,
      });
    }
  }
  toggleCheck() {
    this.setState({
      checked: !this.state.checked,
    });
  }
  render() {
    const { name, _id } = this.props.student;
    const { first_name, last_name } = name;

    const { checked } = this.state;

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
                <input
                  type="checkbox"
                  name="present"
                  id={_id}
                  checked={checked}
                  onChange={this.toggleCheck}
                />
              </span>
            </div>
          </div>
        </li>
      </label>
    );
  }
}
