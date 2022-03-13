import React, { Component } from "react";
import { Link } from "react-router-dom";

class ClassListItem extends Component {
  render() {
    const { class_item } = this.props;
    const { name, _id } = class_item;
    return (
      <>
        <Link to={`/class/${_id}`}>
          <li className="list-group-item m-1">{name}</li>
        </Link>
      </>
    );
  }
}

export default ClassListItem;
