import React, { Component } from "react";

//import redux
import { connect } from "react-redux";

//import action
import getClassesAction from "../../redux/actions/classes/getClasses.action";

//components
import Loading from "../shared/Loading";
import ClassListItem from "./ClassListItem";

const mapDispatchToProps = (dispatch) => ({
  getClasses: () => {
    dispatch(getClassesAction());
  },
});

class Classes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: {},
    };
  }

  async componentDidMount() {
    await this.props.getClasses();
  }
  render() {
    var { classes_list, status } = this.props.classes;
    const { loading, error, error_message } = status;

    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3 text-center">
            {loading === true ? (
              <Loading />
            ) : (
              <>
                {error === true ? (
                  <>
                    <div className="text-center error-message">
                      {error_message}
                    </div>
                  </>
                ) : (
                  <>
                    <ul className="list-group">
                      {classes_list ? (
                        <>
                          {classes_list.length < 1 ? (
                            <>
                              <div className="text-center">
                                No classes added yet
                              </div>
                            </>
                          ) : (
                            <>
                              {classes_list.map((class_item, index) => (
                                <ClassListItem
                                  class_item={class_item}
                                  key={class_item._id}
                                />
                              ))}
                            </>
                          )}
                        </>
                      ) : null}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    classes: state.classes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
