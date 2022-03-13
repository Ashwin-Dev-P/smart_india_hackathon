import {
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../actions/types";

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

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error: false,
        },
      };

    case REGISTER_FAILED:
      return {
        ...state,
        loggedIn: false,
        status: {
          loading: false,
          error: true,
          error_message: action.payload.error_message || "Something went wrong",
        },
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        status: {
          loading: false,
          error: false,
          message: action.payload.message || "Registration success",
        },
      };

    default:
      return state;
  }
}

export default registerReducer;
