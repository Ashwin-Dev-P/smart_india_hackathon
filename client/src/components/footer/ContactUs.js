import React, { Component } from "react";

//components
import Loading from "../shared/Loading";

export default class ContactUs extends Component {
  render() {
    if (
      this.props.app_details.status.loading === false &&
      this.props.app_details.status.error === false
    ) {
      var { phone_number } = this.props.app_details.data;

      if (phone_number) {
        var country_code = phone_number.country_code;
        var number = phone_number.number;
      }
    } else {
      var { error_message, error, loading } = this.props.app_details.status;
    }

    return (
      <div>
        <h3>Contact Us</h3>
        {loading === true ? (
          <div>
            <Loading />
          </div>
        ) : (
          <>
            {error === true ? (
              <>
                <div className="error-message">{error_message}</div>
              </>
            ) : (
              <>
                <div>
                  Contact number:{" "}
                  <a href={`tel: +${country_code} ${number}`}>
                    +{country_code} {number}
                  </a>
                </div>

                <div>
                  WhatsApp:
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/${country_code}${number}?text=Send20%a20%quote`}
                  >
                    +91 8056150426
                  </a>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
