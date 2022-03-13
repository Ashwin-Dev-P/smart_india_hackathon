import {
  ADD_STUDENT_LOADING,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILED,
  ADD_STUDENT_CLEAR_MESSAGE,
} from "../../../actions/types";

const initialState = {
  status: {
    loading: false,
    error: false,
    success: false,
    error_message: null,
    message: null,
  },
};

function addStudentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDENT_LOADING:
      return {
        ...state,

        status: {
          loading: true,
        },
      };

    case ADD_STUDENT_SUCCESS:
      return {
        ...state,

        status: {
          loading: false,
          error: false,
          success: true,
          message: action.payload.message,
        },
      };

    case ADD_STUDENT_FAILED:
      return {
        ...state,

        status: {
          loading: false,
          error: true,
          error_message:
            action.payload.error_message || "Unable to add student",
          success: false,
        },
      };

    case ADD_STUDENT_CLEAR_MESSAGE:
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

export default addStudentReducer;
