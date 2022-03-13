import React, { Component } from "react";

//import components
import MyButton from "../shared/MyButton";

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <h2>Feedback</h2>
        <div>
          <form>
            <div>
              <label htmlFor="name">Your name:</label>
              <input type="text" inputMode="text" id="name"></input>
            </div>
            <div>
              <label htmlFor="feedback">Your feedback:</label>
              <textarea id="feedback" inputMode="text"></textarea>
            </div>
            <div>
              <MyButton text="submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
