import {
  GET_APP_DETAILS,
  GET_APP_DETAILS_FAILED,
  GET_APP_DETAILS_LOADING,
} from "../actions/types";

const initialState = {
  data: {
    name: {
      abbreviation: "",
      expansion: "",
    },
    phone_number: {
      number: "",
      country_code: "",
    },
  },
  status: {
    loading: false,
    error: false,
    error_message: null,
  },
};

function getAppDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APP_DETAILS:
      return {
        ...state,

        data: action.payload,
        status: {
          loading: false,
          error: false,
        },
      };

    case GET_APP_DETAILS_LOADING:
      return {
        ...state,

        status: {
          loading: true,
          error: false,
        },
      };

    case GET_APP_DETAILS_FAILED:
      return {
        ...state,

        status: {
          loading: false,
          error: true,
          error_message:
            action.payload.error_message || "Unable to fetch app details",
        },
      };

    default:
      return state;
  }
}

export default getAppDetailsReducer;
