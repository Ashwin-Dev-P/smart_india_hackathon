import axios from "axios";

//config
import { config } from "../../../config/index";
import { GET_CLASSES_LOADING, GET_CLASSES, GET_CLASSES_FAILED } from "../types";
const configData = config();
const backend_url = configData.backend_url;

const getClasses = () => {
  return async (dispatch) => {
    await dispatch({
      type: GET_CLASSES_LOADING,
    });

    const url = backend_url + "/api/class";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };

    await axios
      .get(url, headers)
      .then(async (response) => {
        const axios_data = response.data;
        if (response.status === 200) {
          const server_status = axios_data.status;

          if (server_status === 200) {
            const classes = axios_data.classes;

            await dispatch({
              type: GET_CLASSES,
              payload: classes,
            });
          } else {
            await dispatch({
              type: GET_CLASSES_FAILED,
              payload: {
                error_message: axios_data.message,
              },
            });
          }
        } else {
          await dispatch({
            type: GET_CLASSES_FAILED,
            payload: {
              error_message: axios_data.message,
            },
          });
        }
      })
      .catch(async (error) => {
        console.group("Get classes error");
        console.error("Unable to get classes");
        console.error(error);
        console.group("Get classes error");

        await dispatch({
          type: GET_CLASSES_FAILED,
          payload: {
            error_message: error.message,
          },
        });
      });
  };
};

export default getClasses;
