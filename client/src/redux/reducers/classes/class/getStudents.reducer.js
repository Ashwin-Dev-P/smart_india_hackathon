import {
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAILED,
  GET_STUDENTS_LOADING,
  GET_STUDENTS_CLEAR_MESSAGE,
} from "../../../actions/types";

const initialState = {
  students_list: [],
  status: {
    loading: false,
    error: false,
    message: null,
    error_message: null,
  },
};

function getStudentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,

        students_list: action.payload,
        status: {
          loading: false,
          error: false,
          error_message: null,
          message: null,
        },
      };

    case GET_STUDENTS_LOADING:
      return {
        ...state,

        students_list: [],
        status: {
          loading: true,
          error: false,
          error_message: null,
          message: null,
        },
      };

    case GET_STUDENTS_FAILED:
      return {
        ...state,

        students_list: [],
        status: {
          loading: false,
          error: true,
          error_message:
            action.payload.error_message || "Unable to fetch students",
          message: null,
        },
      };

    case GET_STUDENTS_CLEAR_MESSAGE:
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

export default getStudentsReducer;
