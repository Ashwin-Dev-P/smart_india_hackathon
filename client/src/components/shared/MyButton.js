import React, { Component } from "react";

export default class MyButton extends Component {
  render() {
    const { text, type, className } = this.props;
    return (
      <>
        <button className={className} type={type} onClick={this.props.onClick}>
          {text}
        </button>
      </>
    );
  }
}
