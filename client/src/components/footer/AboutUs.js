import React, { Component } from "react";
import Loading from "../shared/Loading";

export default class AboutUs extends Component {
  render() {
    const { loading, error, error_message } = this.props.app_details.status;
    if (
      this.props.app_details.status.loading === false &&
      this.props.app_details.status.error === false
    ) {
      var { intro } = this.props.app_details.data;
    }

    return (
      <div>
        <h3>About Us</h3>
        <div>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              {error === true ? (
                <div className="error-message">{error_message}</div>
              ) : (
                <>{intro}</>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
