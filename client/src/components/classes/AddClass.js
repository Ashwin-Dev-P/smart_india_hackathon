import React, { Component } from "react";

//import redux
import { connect } from "react-redux";

//import action
import addClassAction from "../../redux/actions/classes/addClass/addClass.action";

//import components
//shared
import Loading from "../shared/Loading";
import MyButton from "../shared/MyButton";

//const addClassAction = require("../../redux/actions/classes/addClass/addClass.action");

const mapDispatchToProps = (dispatch) => ({
  addClass: (clear_message, form_data) => {
    dispatch(addClassAction(clear_message, form_data));
  },
});

class AddClass extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  async componentWillUnmount() {
    await this.props.addClass(true);
  }

  async submitHandler(e) {
    await e.preventDefault();
    const name = document.getElementById("class_name").value;
    const starting_year = document.getElementById("starting_year").value;
    const ending_year = document.getElementById("ending_year").value;

    const year = {
      starting_year: starting_year,
      ending_year: ending_year,
    };

    const form_data = {
      name: name,
      year: year,
    };

    await this.props.addClass(false, form_data);
  }
  render() {
    var { loading, error, error_message, success, message } =
      this.props.addClassStatus;

    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-3 col-xl-4"></div>
          <div className="col-xs-12 col-md-6 col-xl-4">
            <div className="myBorder myForm">
              <h2 className="myHeading">Add Class</h2>
              <form onSubmit={this.submitHandler}>
                <div className="form-group">
                  <label htmlFor="class_name">Class name</label>
                  <input
                    inputMode="text"
                    type="text"
                    id="class_name"
                    className="form-control"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  Batch
                  <div className="form-group">
                    <label htmlFor="starting_year">Starting year</label>
                    <input
                      id="starting_year"
                      type="number"
                      min="1900"
                      step="1"
                      inputMode="numeric"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ending_year">Ending year</label>
                    <input
                      id="ending_year"
                      type="number"
                      min="1900"
                      step="1"
                      inputMode="numeric"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <MyButton
                    className="btn btn-primary  btn-full-width"
                    text="Add class"
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
}

const mapStateToProps = (state) => {
  return {
    addClassStatus: state.addClass.status,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddClass);
