import { MARK_ATTENDANCE_CLEAR } from "../../types";

const clearAttendanceMessageAction = () => {
  return async (dispatch) => {
    await dispatch({
      type: MARK_ATTENDANCE_CLEAR,
    });
  };
};

export default clearAttendanceMessageAction;
