import axios from "axios";
import {
  ADD_STUDENT_LOADING,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILED,
} from "../../types";

//config
import { config } from "../../../../config/index";
const configData = config();
const backend_url = configData.backend_url;

const addStudentAction = (form_data) => {
  return async (dispatch) => {
    await dispatch({
      type: ADD_STUDENT_LOADING,
    });

    const url = backend_url + "/api/student";

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
              type: ADD_STUDENT_SUCCESS,
              payload: {
                message: server_response.message,
              },
            });
          } else {
            await dispatch({
              type: ADD_STUDENT_FAILED,
              payload: {
                error_message: server_response.message,
              },
            });
          }
        } else {
          await dispatch({
            type: ADD_STUDENT_FAILED,
            payload: {
              error_message: null,
            },
          });
        }
      })
      .catch(async (error) => {
        console.error("Unable to add student", error);

        await dispatch({
          type: ADD_STUDENT_FAILED,
          payload: {
            error_message: error.message,
          },
        });
      });
  };
};

export default addStudentAction;
