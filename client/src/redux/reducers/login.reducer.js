import { LOGIN_FAILED, LOGIN_LOADING, LOGIN_SUCCESS } from "../actions/types";

//utils
import isLogin from "../../utils/isLogin";
const loggedIn = isLogin();

const initialState = {
  loggedIn: loggedIn,
  status: {
    loading: false,
    error: false,
  },
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error: false,
        },
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loggedIn: false,
        status: {
          loading: false,
          error: true,
          error_message: action.payload || "Something went wrong",
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        status: {
          loading: false,
          error: false,
        },
      };

    default:
      return state;
  }
}

export default loginReducer;
