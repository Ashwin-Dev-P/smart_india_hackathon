import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//import redux
import { connect } from "react-redux";

//import actions
import getStudentsAction from "../../../redux/actions/classes/class/getStudents.action";

//import components
//shared components
import Loading from "../../shared/Loading";
import StudentListItem from "./StudentListItem";

const mapDispatchToProps = (dispatch) => ({
  getStudentsAction: (form_data) => {
    dispatch(getStudentsAction(form_data));
  },
});

function MyClass(props) {
  const { class_id } = useParams();

  const getStudentsAction = props.getStudentsAction;

  useEffect(() => {
    const form_data = {
      class_id: class_id,
    };
    getStudentsAction(form_data);
  }, [getStudentsAction, class_id]);

  if (props.getStudents && props.getStudents.status) {
    var { loading, error, error_message } = props.getStudents.status;
    var { students_list } = props.getStudents;
  }

  return (
    <>
      {loading === true ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : null}

      {loading !== true ? (
        <>
          <div className="row justify-content-center ">
            {error === true ? (
              <div className="text-center error-message">{error_message}</div>
            ) : null}
          </div>

          <div>
            {students_list ? (
              <>
                {!error && students_list.length < 1 ? (
                  <>
                    <div className="row justify-content-center class-crud-buttons-div">
                      <div className="col-xs-12 col-md-6 col-lg-3 text-center">
                        <Link
                          to={`/add_student/class/${class_id}`}
                          className="btn btn-primary m-1"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i> Add
                          Student
                        </Link>
                      </div>
                    </div>
                    <div className="text-center">No students available</div>
                  </>
                ) : (
                  <>
                    <>
                      <div className="row justify-content-center class-crud-buttons-div">
                        <div className="col-xs-12 text-center">
                          <Link
                            to={`/add_student/class/${class_id}`}
                            className="btn btn-primary m-1"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add Student
                          </Link>

                          <Link
                            to={`/attendance/class/${class_id}`}
                            className="btn btn-primary m-1"
                          >
                            Mark attendance
                          </Link>

                          <Link
                            to={`/attendance/class/${class_id}/weekly`}
                            className="btn btn-primary m-1"
                          >
                            View last week
                          </Link>
                          <Link
                            to={`/attendance/class/${class_id}/bar_chart`}
                            className="btn btn-primary m-1"
                          >
                            View graph
                          </Link>
                        </div>
                      </div>
                    </>
                    <div className="row justify-content-center">
                      <div className="text-center col-xs-12 col-md-6 col-lg-4 col-xl-3">
                        <ul className="list-group">
                          {students_list.map((student) => (
                            <StudentListItem
                              key={student._id}
                              student={student}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}

function mapStateToProps(state) {
  return { getStudents: state.getStudents };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyClass);
