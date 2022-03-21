import React, { Component } from "react";

//import components
import MyButton from "../shared/MyButton";

export default class Feedback extends Component {
  render() {
    return (
      <div className="loginWholeComponent">
        <div className="row">
          <div className="col-xs-12 col-md-3 col-lg-4"></div>
          <div className="col-xs-12 col-md-6 col-lg-4">
            <div className=" myBorder loginComponent ">
              <form>
                <h2 className="myHeading">Feedback</h2>
                <div className="form-group">
                  <label htmlFor="name">Your name:</label>
                  <input
                    type="text"
                    inputMode="text"
                    id="name"
                    className="form-control"
                    autoFocus
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="feedback">Your feedback:</label>
                  <textarea
                    id="feedback"
                    inputMode="text"
                    className="form-control"
                  ></textarea>
                </div>
                <div>
                  <MyButton
                    text="submit"
                    type="submit"
                    className="btn btn-primary btn-full-width"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
