import {
  MARK_ATTENDANCE_LOADING,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAILED,
  MARK_ATTENDANCE_CLEAR,
} from "../../../actions/types";

const initialState = {
  status: {
    loading: false,
    error: false,
    message: null,
    error_message: null,
  },
};

function markAttendanceReducer(state = initialState, action) {
  switch (action.type) {
    case MARK_ATTENDANCE_SUCCESS:
      return {
        ...state,

        status: {
          loading: false,
          error: false,
          error_message: null,
          message: action.payload.message,
        },
      };

    case MARK_ATTENDANCE_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error: false,
          error_message: null,
          message: null,
        },
      };

    case MARK_ATTENDANCE_FAILED:
      return {
        ...state,

        status: {
          loading: false,
          error: true,
          error_message:
            action.payload.error_message || "Unable to mark attendance",
          message: null,
        },
      };

    case MARK_ATTENDANCE_CLEAR:
      return {
        ...state,
        status: {
          loading: false,
          error: false,
          error_message: null,
          message: null,
        },
      };

    default:
      return state;
  }
}

export default markAttendanceReducer;
