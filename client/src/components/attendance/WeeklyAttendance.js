import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//import redux
import { connect } from "react-redux";

//action
import getStudentsAction from "../../redux/actions/classes/class/getStudents.action";
import Loading from "../shared/Loading";

//utils
import Last7Days from "../../utils/DateTime/Last7Days";

import AttendanceTable from "./AttendanceTable/AttendanceTable";

const mapDispatchToProps = (dispatch) => ({
  getStudentsAction: (form_data) => {
    dispatch(getStudentsAction(form_data));
  },
});

function WeeklyAttendance(props) {
  const { class_id } = useParams();

  const getStudentsAction = props.getStudentsAction;
  useEffect(() => {
    const form_data = {
      class_id: class_id,
    };
    getStudentsAction(form_data);
  }, [getStudentsAction, class_id]);

  var last_7_days = Last7Days();
  last_7_days = last_7_days.reverse();

  const { error, error_message, loading } = props.getStudents.status;
  const students_list = props.getStudents.students_list;
  const last_n_days = last_7_days;
  return (
    <div>
      <h2 className="myHeading my-margin">Weekly Attendance</h2>

      <div className="row my-margin">
        <div className="col-xl-1"></div>
        <div className="col-xs-12 col-xl-10">
          {error && error_message ? (
            <div className="error-message text-center">{error_message}</div>
          ) : (
            <>
              {loading === true ? (
                <>
                  <div className="text-center">
                    <Loading />
                  </div>
                </>
              ) : (
                <>
                  <AttendanceTable
                    last_n_days={last_n_days}
                    students_list={students_list}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    getStudents: state.getStudents,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyAttendance);
