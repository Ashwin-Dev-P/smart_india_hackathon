import React, { Component } from "react";
import MyRoutes from "../../routes/my_routes";

//import components
import Header from "../header";
import Footer from "../footer";

//redux
import { connect } from "react-redux";

//actions
import getAppDetailsAction from "../../redux/actions/getAppDetails.action";

const mapDispatchToProps = (dispatch) => ({
  getAppDetails: () => {
    dispatch(getAppDetailsAction());
  },
});

class index extends Component {
  constructor(props) {
    super(props);

    this.props.getAppDetails();
  }
  render() {
    return (
      <>
        <div>
          <Header />

          <main>
            <MyRoutes />
          </main>
          <Footer {...this.props} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app_details: state.getAppDetailsReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
