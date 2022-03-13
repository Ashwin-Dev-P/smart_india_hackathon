import axios from "axios";

//config
import { config } from "../../../../config/index";
import {
  GET_STUDENTS_FAILED,
  GET_STUDENTS_LOADING,
  GET_STUDENTS_SUCCESS,
} from "../../types";

const configData = config();
const backend_url = configData.backend_url;

const getStudentsAction = (form_data) => {
  return async (dispatch) => {
    await dispatch({
      type: GET_STUDENTS_LOADING,
    });

    const url = backend_url + "/api/student/get_students";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };

    await axios
      .post(url, form_data, headers)
      .then(async (response) => {
        const axios_data = response.data;
        if (response.status === 200) {
          const server_status = axios_data.status;

          if (server_status === 200) {
            const students_list = axios_data.students;

            await dispatch({
              type: GET_STUDENTS_SUCCESS,
              payload: students_list,
            });
          } else {
            await dispatch({
              type: GET_STUDENTS_FAILED,
              payload: {
                error_message: axios_data.message,
              },
            });
          }
        } else {
          await dispatch({
            type: GET_STUDENTS_FAILED,
            payload: {
              error_message: axios_data.message,
            },
          });
        }
      })
      .catch(async (error) => {
        console.group("Get students error");
        console.error("Unable to get students");
        console.error(error);
        console.group("Get students error");

        await dispatch({
          type: GET_STUDENTS_FAILED,
          payload: {
            error_message: error.message,
          },
        });
      });
  };
};

export default getStudentsAction;
