import { RECAPTCHA_SELECTED, CLEAR_RECAPTCHA } from "../actions/types";

const initialState = {
  recaptcha_verified: false,
  token: null,
};

function recaptchaReducer(state = initialState, action) {
  switch (action.type) {
    case RECAPTCHA_SELECTED:
      return {
        ...state,

        recaptcha_verified: true,
        token: action.payload.token,
      };

    case CLEAR_RECAPTCHA:
      return {
        ...state,
        recaptcha_verified: false,
        token: null,
      };

    default:
      return state;
  }
}

export default recaptchaReducer;
