import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

//import redux
import { connect } from "react-redux";

//actions
import loginAction from "../../redux/actions/loginAction";

//import components
import MyButton from "../shared/MyButton";
import Loading from "../shared/Loading";

const mapDispatchToProps = (dispatch) => ({
  loginAction: (form_data) => {
    dispatch(loginAction(form_data));
  },
});

class index extends Component {
  constructor(props) {
    super(props);

    this.loginHandler = this.loginHandler.bind(this);
  }
  loginHandler(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const form_data = {
      email,
      password,
    };

    this.props.loginAction(form_data);
  }

  render(state) {
    if (this.props.loggedIn === true) {
      <Navigate to="/classes" />;
    }

    var { loading } = this.props.login_details.status;
    if (this.props.login_details.status.error === true) {
      var { error_message } = this.props.login_details.status;
    }

    return (
      <div className="loginWholeComponent">
        {this.props.loggedIn === true ? <Navigate to="/classes" /> : null}

        <div className="row">
          <div className="col-xs-12 col-md-3 col-lg-4"></div>
          <div className="col-xs-12 col-md-6 col-lg-4">
            <div className=" myBorder loginComponent">
              <form className="" onSubmit={this.loginHandler}>
                <h2 className="myHeading">Login</h2>
                <div className="form-group">
                  <input
                    type="email"
                    inputMode="email"
                    id="email"
                    className="form-control"
                    placeholder="email"
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    inputMode="text"
                    id="password"
                    className="form-control"
                    placeholder="password"
                    required
                  />
                </div>
                <div className="form-group">
                  <MyButton
                    className="btn btn-primary btn-full-width"
                    text="login"
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
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login_details: state.loginReducer,
    loggedIn: state.logoutReducer.loggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
