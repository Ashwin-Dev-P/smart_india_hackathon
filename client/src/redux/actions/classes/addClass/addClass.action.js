import axios from "axios";
import {
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILED,
  ADD_CLASS_LOADING,
  ADD_CLASS_CLEAR_MESSAGE,
} from "../../types";

//config
import { config } from "../../../../config/index";
const configData = config();
const backend_url = configData.backend_url;

const addClassAction = (clear_message, form_data) => {
  return async (dispatch) => {
    if (clear_message === true) {
      await dispatch({
        type: ADD_CLASS_CLEAR_MESSAGE,
      });
      return;
    }
    await dispatch({
      type: ADD_CLASS_LOADING,
    });

    const url = backend_url + "/api/class/add_class";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };

    await axios
      .post(url, form_data, headers)

      .then(async (response) => {
        //Axios check
        if (response.status === 200) {
          const server_response = response.data;
          const status = server_response.status;

          //My server check
          if (status === 200) {
            await dispatch({
              type: ADD_CLASS_SUCCESS,
              payload: {
                message: server_response.message,
              },
            });
          } else {
            await dispatch({
              type: ADD_CLASS_FAILED,
              payload: {
                error_message: server_response.message,
              },
            });
          }
        } else {
          await dispatch({
            type: ADD_CLASS_FAILED,
            payload: {
              error_message: null,
            },
          });
        }
      })
      .catch(async (error) => {
        console.error("Unable to add class", error);

        await dispatch({
          type: ADD_CLASS_FAILED,
          payload: {
            error_message: error.message,
          },
        });
      });
  };
};

export default addClassAction;
