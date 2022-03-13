import React from "react";
import { Link, useNavigate } from "react-router-dom";

//redux
import { connect } from "react-redux";

//components
//shared
import MyButton from "../shared/MyButton";

//actions
import logoutAction from "../../redux/actions/logout.action";

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => {
    dispatch(logoutAction());
  },
});

function Index(props) {
  const { loggedIn } = props;

  var navigate = useNavigate();
  function logout() {
    props.logoutAction();
    navigate("/login");
  }

  return (
    <>
      <header className="myBorder">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            SIH
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact us
                </Link>
              </li>

              {loggedIn !== true ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/classes">
                      My classes
                    </Link>
                  </li>
                  <MyButton
                    className="btn btn-danger"
                    text="logout"
                    onClick={() => logout()}
                  />
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <hr />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.logoutReducer.loggedIn,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
