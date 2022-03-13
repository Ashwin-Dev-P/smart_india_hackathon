import {
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILED,
  ADD_CLASS_LOADING,
  ADD_CLASS_CLEAR_MESSAGE,
} from "../../actions/types";

const initialState = {
  status: {
    loading: false,
    error: false,
    success: false,
    error_message: null,
    message: null,
  },
};

function addClassesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CLASS_SUCCESS:
      return {
        ...state,

        status: {
          loading: false,
          error: false,
          success: true,
          message: action.payload.message,
        },
      };

    case ADD_CLASS_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error: false,
          success: false,
        },
      };

    case ADD_CLASS_FAILED:
      return {
        ...state,

        status: {
          loading: false,
          error: true,
          error_message: action.payload.error_message || "Unable to add class",
          success: false,
        },
      };

    case ADD_CLASS_CLEAR_MESSAGE:
      return {
        ...state,

        status: {
          loading: false,
          error: false,
          error_message: null,
          success: false,
          message: null,
        },
      };

    default:
      return state;
  }
}

export default addClassesReducer;
