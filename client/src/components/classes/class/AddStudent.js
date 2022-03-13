import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//import redux
import { connect } from "react-redux";

//import action
import addStudentAction from "../../../redux/actions/classes/class/addStudent.action";
import clearAddStudentMessageAction from "../../../redux/actions/classes/class/clearAddStudentMessage.action";

//import components
//shared
import Loading from "../../shared/Loading";
import MyButton from "../../shared/MyButton";

const mapDispatchToProps = (dispatch) => ({
  addStudentAction: (form_data) => {
    dispatch(addStudentAction(form_data));
  },
  clearAddStudentMessage: () => {
    dispatch(clearAddStudentMessageAction());
  },
});

function AddStudent(props) {
  const { class_id } = useParams();

  let clearAddStudentMessage = props.clearAddStudentMessage;

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
      clearAddStudentMessage();
    };
  }, [clearAddStudentMessage]);

  async function submitHandler(e) {
    await e.preventDefault();

    const last_name = document.getElementById("last_name").value;
    const first_name = document.getElementById("first_name").value;

    const form_data = {
      class_id: class_id,
      name: {
        first_name: first_name,
        last_name: last_name,
      },
    };

    await props.addStudentAction(form_data);
  }

  const { loading, error, error_message, success, message } =
    props.addStudent.status;

  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-3 col-xl-4"></div>
        <div className="col-xs-12 col-md-6 col-xl-4">
          <div className="myBorder myForm">
            <h2 className="myHeading">Add Student</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="first_name">First name</label>
                <input
                  inputMode="text"
                  type="text"
                  id="first_name"
                  className="form-control"
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last name</label>
                <input
                  inputMode="text"
                  type="text"
                  id="last_name"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <MyButton
                  className="btn btn-primary  btn-full-width"
                  text="Add student"
                  type="submit"
                />
              </div>
              <div className="text-center">
                {loading === true ? (
                  <Loading />
                ) : (
                  <>
                    {error ? (
                      <div className="error-message">{error_message}</div>
                    ) : null}

                    {success ? (
                      <div className="success-message">{message}</div>
                    ) : null}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { addStudent: state.addStudent };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);
