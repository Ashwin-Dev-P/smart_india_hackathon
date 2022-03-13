import { LOGGED_IN_STATE } from "../actions/types";

//utils
import isLogin from "../../utils/isLogin";
const loggedIn = isLogin();

const initialState = {
  loggedIn: loggedIn,
};

function logoutReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN_STATE:
      const loggedIn = isLogin();

      return {
        ...state,
        loggedIn: loggedIn,
      };

    default:
      return state;
  }
}

export default logoutReducer;
