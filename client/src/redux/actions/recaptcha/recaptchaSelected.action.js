import { RECAPTCHA_SELECTED } from "../types";

const recaptchaSelectedAction = (token) => {
  return async (dispatch) => {
    await dispatch({
      type: RECAPTCHA_SELECTED,
      payload: {
        token: token,
      },
    });
  };
};

export default recaptchaSelectedAction;
