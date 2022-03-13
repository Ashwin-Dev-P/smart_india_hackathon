import { ADD_STUDENT_CLEAR_MESSAGE } from "../../types";

const clearAddStudentMessageAction = () => {
  return async (dispatch) => {
    await dispatch({
      type: ADD_STUDENT_CLEAR_MESSAGE,
    });
  };
};

export default clearAddStudentMessageAction;
