import { CLEAR_RECAPTCHA } from "../types";

const clearRecaptchaAction = () => {
  return async (dispatch) => {
    await dispatch({
      type: CLEAR_RECAPTCHA,
    });
  };
};

export default clearRecaptchaAction;
