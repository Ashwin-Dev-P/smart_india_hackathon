import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

//import redux
import { connect } from "react-redux";

//actions
import loginAction from "../../redux/actions/loginAction";
import recaptchaSelectedAction from "../../redux/actions/recaptcha/recaptchaSelected.action";
import clearRecaptchaAction from "../../redux/actions/recaptcha/clearRecaptcha.action";

//import components
import MyButton from "../shared/MyButton";
import Loading from "../shared/Loading";

const sitekey =
  process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
  process.env.REACT_APP_RECAPTCHA_SITE_TEST_KEY;

const mapDispatchToProps = (dispatch) => ({
  loginAction: (form_data) => {
    dispatch(loginAction(form_data));
  },
  recaptchaSelectedAction: (token) => {
    dispatch(recaptchaSelectedAction(token));
  },

  clearRecaptchaAction: () => {
    dispatch(clearRecaptchaAction());
  },
});

class index extends Component {
  constructor(props) {
    super(props);

    this.loginHandler = this.loginHandler.bind(this);
    this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearRecaptchaAction();
  }

  loginHandler(e) {
    e.preventDefault();

    const reCAPTCHA_token = this.props.reCAPTCHA.token;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const form_data = {
      email,
      password,
      reCAPTCHA_token,
    };

    this.props.loginAction(form_data);
  }

  onRecaptchaChange(token) {
    if (token) {
      this.props.recaptchaSelectedAction(token);
    }
  }

  render() {
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
              <form onSubmit={this.loginHandler}>
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
                <div className="form-group text-center">
                  <ReCAPTCHA
                    sitekey={sitekey}
                    onChange={this.onRecaptchaChange}
                    className="btn-full-width"
                    size="normal"
                  />
                </div>
                <div className="form-group">
                  <MyButton
                    className="btn btn-primary btn-full-width"
                    text="login"
                    type="submit"
                    disabled={!this.props.reCAPTCHA.recaptcha_verified}
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
    reCAPTCHA: state.reCAPTCHA,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
