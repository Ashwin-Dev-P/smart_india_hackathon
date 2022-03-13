import {
  GET_CLASSES,
  GET_CLASSES_FAILED,
  GET_CLASSES_LOADING,
} from "../../actions/types";

const initialState = {
  classes_list: [],
  status: {
    loading: false,
    error: false,
  },
};

function getClassesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,

        classes_list: action.payload,
        status: {
          loading: false,
          error: false,
        },
      };

    case GET_CLASSES_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error: false,
        },
      };

    case GET_CLASSES_FAILED:
      return {
        ...state,

        status: {
          loading: false,
          error: true,
          error_message:
            action.payload.error_message || "Unable to fetch classes",
        },
      };

    default:
      return state;
  }
}

export default getClassesReducer;
