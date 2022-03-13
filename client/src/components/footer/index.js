import React, { Component } from "react";
import AboutUs from "./AboutUs";

import ContactUs from "./ContactUs";

class index extends Component {
  render() {
    return (
      <>
        <footer className="myBorder">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <AboutUs {...this.props} />
            </div>
            <div className="col-xs-12 col-md-4"></div>
            <div className="col-xs-12 col-md-4">
              <ContactUs {...this.props} />
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default index;
