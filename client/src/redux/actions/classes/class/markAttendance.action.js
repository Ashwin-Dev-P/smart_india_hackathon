import axios from "axios";
import {
  MARK_ATTENDANCE_LOADING,
  MARK_ATTENDANCE_FAILED,
  MARK_ATTENDANCE_SUCCESS,
} from "../../types";

//config
import { config } from "../../../../config/index";
const configData = config();
const backend_url = configData.backend_url;

const markAttendanceAction = (form_data) => {
  return async (dispatch) => {
    await dispatch({
      type: MARK_ATTENDANCE_LOADING,
    });

    const url = backend_url + "/api/student/mark_attendance";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };

    await axios
      .post(url, form_data, headers)

      .then(async (response) => {
        //Axios check
        console.log(response);
        if (response.status === 200) {
          const server_response = response.data;
          const status = server_response.status;

          //My server check
          if (status === 200) {
            await dispatch({
              type: MARK_ATTENDANCE_SUCCESS,
              payload: {
                message: server_response.message,
              },
            });
          } else {
            await dispatch({
              type: MARK_ATTENDANCE_FAILED,
              payload: {
                error_message: server_response.message,
              },
            });
          }
        } else {
          await dispatch({
            type: MARK_ATTENDANCE_FAILED,
            payload: {
              error_message: null,
            },
          });
        }
      })
      .catch(async (error) => {
        console.error("Unable to mark attendance", error);

        await dispatch({
          type: MARK_ATTENDANCE_FAILED,
          payload: {
            error_message: error.message,
          },
        });
      });
  };
};

export default markAttendanceAction;
