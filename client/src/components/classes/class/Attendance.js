import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//import redux
import { connect } from "react-redux";

//import actions
import getStudentsAction from "../../../redux/actions/classes/class/getStudents.action";
import markAttendanceAction from "../../../redux/actions/classes/class/markAttendance.action";
import clearMarkAttendanceAction from "../../../redux/actions/classes/class/clearMarkAttendance.action";

//import components
//shared components
import Loading from "../../shared/Loading";
import MyButton from "../../shared/MyButton";

//other components
import StudentAttendanceListItem from "./Attendance/StudentAttendanceListItem";

const mapDispatchToProps = (dispatch) => ({
  getStudentsAction: (form_data) => {
    dispatch(getStudentsAction(form_data));
  },
  markAttendanceAction: (form_data) => {
    dispatch(markAttendanceAction(form_data));
  },
  clearMarkAttendanceAction: () => {
    dispatch(clearMarkAttendanceAction());
  },
});

function myGetDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const currentDate = dd + "/" + mm + "/" + yyyy;
  return currentDate;
}

function getTimeStampStartOfDay() {
  var now = new Date();
  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var timestamp = startOfDay / 1000;
  return timestamp;
}

function Attendance(props) {
  const { class_id } = useParams();

  const getStudentsAction = props.getStudentsAction;
  const clearMarkAttendanceAction = props.clearMarkAttendanceAction;

  useEffect(() => {
    const form_data = {
      class_id: class_id,
    };
    getStudentsAction(form_data);

    return () => {
      // Anything in here is fired on component unmount.
      clearMarkAttendanceAction();
    };
  }, [getStudentsAction, clearMarkAttendanceAction, class_id]);

  //attendance form submit handler
  const attendanceFormSubmitHandler = (e) => {
    e.preventDefault();

    const checkboxs = document.getElementsByName("present");

    const student_ids = [];
    for (var index = 0; index < checkboxs.length; index++) {
      const checkbox = checkboxs[index];

      if (checkbox.checked) {
        const student_id = checkbox.id;
        student_ids.push(student_id);
      }
    }

    const form_data = {
      student_ids: student_ids,
      class_id: class_id,
      date: getTimeStampStartOfDay(),
    };

    props.markAttendanceAction(form_data);
  };

  if (props.getStudents && props.getStudents.status) {
    var { loading, error, error_message } = props.getStudents.status;
    var { students_list } = props.getStudents;
  }

  const submitting = props.markAttendance.status.loading;
  const mark_attendance_error = props.markAttendance.status.error;
  const mark_attendance_error_message =
    props.markAttendance.status.error_message;
  const mark_attendance_message = props.markAttendance.status.message;

  const currentDate = myGetDate();
  return (
    <div>
      <h2 className="myHeading">Attendance</h2>
      <div>
        <div className="text-center">{currentDate}</div>

        <div>
          {loading === true ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : null}

          {loading !== true ? (
            <>
              <div className="row justify-content-center ">
                {error === true ? (
                  <div className="text-center error-message">
                    {error_message}
                  </div>
                ) : null}
              </div>

              <div className="m-5">
                {students_list ? (
                  <>
                    {!error && students_list.length < 1 ? (
                      <div className="text-center">No students available</div>
                    ) : (
                      <div className="row justify-content-center">
                        <div className="text-center col-xs-12 col-md-6 col-lg-4">
                          <form onSubmit={attendanceFormSubmitHandler}>
                            <ul className="list-group">
                              {students_list.map((student) => (
                                <StudentAttendanceListItem
                                  key={student._id}
                                  student={student}
                                />
                              ))}
                            </ul>

                            {submitting === true ? (
                              <>
                                <div className="text-center">
                                  <div className="m-1">
                                    <MyButton
                                      type="submit"
                                      text="Submit"
                                      className="btn btn-primary"
                                      disabled={true}
                                    />
                                  </div>
                                  <div>
                                    <Loading />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="m-1">
                                  <MyButton
                                    type="submit"
                                    text="Submit"
                                    className="btn btn-primary"
                                  />
                                </div>

                                {mark_attendance_error &&
                                mark_attendance_error_message ? (
                                  <div className="text-center error-message">
                                    {error_message}
                                  </div>
                                ) : (
                                  <>
                                    {mark_attendance_message ? (
                                      <div className="success-message">
                                        {mark_attendance_message}
                                      </div>
                                    ) : null}
                                  </>
                                )}
                              </>
                            )}
                          </form>
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    markAttendance: state.markAttendance,
    getStudents: state.getStudents,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
