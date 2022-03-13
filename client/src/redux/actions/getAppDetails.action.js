import {
  GET_APP_DETAILS,
  GET_APP_DETAILS_FAILED,
  GET_APP_DETAILS_LOADING,
} from "./types";
import axios from "axios";

//config
import { config } from "../../config/index";
const configData = config();
const backend_url = configData.backend_url;

//const backend_url = config.backend_url;

const getAppDetails = () => {
  return async (dispatch) => {
    //Loading dispatch
    await dispatch({
      type: GET_APP_DETAILS_LOADING,
    });

    const url = backend_url + "/api/app_details";
    await axios
      .get(url)

      .then(async (response) => {
        if (response.status === 200) {
          const server_response = response.data;

          await dispatch({
            type: GET_APP_DETAILS,
            payload: server_response,
          });
        } else {
          await dispatch({
            type: GET_APP_DETAILS_FAILED,
            payload: {
              error_message: "Unable to fetch app details",
            },
          });
        }
      })
      .catch(async (error) => {
        await dispatch({
          type: GET_APP_DETAILS_FAILED,
          payload: {
            error_message: error.message,
          },
        });
      });
  };
};

export default getAppDetails;
