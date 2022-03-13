import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

//import components
import MyButton from "../shared/MyButton";
import Loading from "../shared/Loading";

//REDUX
import { connect } from "react-redux";

//actions
import registerAction from "../../redux/actions/registerAction";

const mapDispatchToProps = (dispatch) => ({
  registerAction: (form_data) => {
    dispatch(registerAction(form_data));
  },
});

class index extends Component {
  constructor(props) {
    console.log("ys");
    super(props);
    this.registerHandler = this.registerHandler.bind(this);
  }
  registerHandler(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirmation = document.getElementById(
      "password_confirmation"
    ).value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;

    const form_data = {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
    };
    console.log(form_data);
    this.props.registerAction(form_data);
  }

  render() {
    if (this.props.loggedIn === true) {
      <Navigate to="/classes" />;
    }

    var { loading, error } = this.props.register.status;
    if (error) {
      var error_message = this.props.register.status.error_message;
    }

    return (
      <div className="loginWholeComponent">
        {this.props.loggedIn === true ? <Navigate to="/classes" /> : null}

        <div className="row">
          <div className="col-xs-12 col-md-3 col-lg-4"></div>
          <div className="col-xs-12 col-md-6 col-lg-4">
            <div className=" myBorder loginComponent">
              <form onSubmit={this.registerHandler}>
                <div>
                  <h2 className="myHeading">Registration</h2>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    inputMode="email"
                    id="email"
                    className="form-control"
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    inputMode="text"
                    id="password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_confirmation">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    inputMode="text"
                    id="password_confirmation"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="first_name">First name</label>
                  <input
                    type="text"
                    inputMode="text"
                    id="first_name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">Last name</label>
                  <input
                    type="text"
                    inputMode="text"
                    id="last_name"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <MyButton
                    className="btn btn-primary btn-full-width"
                    text="register"
                    type="submit"
                  />
                </div>

                <div className="text-center">
                  {loading ? <Loading /> : null}
                  {error_message ? (
                    <div className="error-message">{error_message}</div>
                  ) : null}
                </div>
              </form>
            </div>
            <div className="text-center loginSubComponent myBorder">
              Already a member? <Link to="/login">log in</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    register: state.registerReducer,
    loggedIn: state.logoutReducer.loggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
