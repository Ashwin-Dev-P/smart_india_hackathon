import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_LOADING,
  LOGGED_IN_STATE,
} from "./types";

import axios from "axios";

//utils
import { getCookie } from "../../utils/getCookie";
import createCookie from "../../utils/createCookie";

//config
import { config } from "../../config/index";
const configData = config();
const backend_url = configData.backend_url;

const registerAction = (form_data) => {
  return async (dispatch) => {
    await dispatch({
      type: REGISTER_LOADING,
    });

    const url = backend_url + "/api/user";

    await axios
      .post(url, form_data)
      .then(async (response) => {
        if (response.status === 200) {
          //Axios check

          const server_response = response.data;
          const status = server_response.status;

          //Server check
          if (status === 200) {
            const payload = {
              message: server_response.message,
            };

            //Cookie bug bypass starts here
            //Set jwt and loggedIn cookie in client side if the cookie is not set by the server side
            const jwt = response.data.jwt;
            const loggedIn = getCookie("loggedIn");
            if (!loggedIn) {
              console.log(
                "Server cookie not set so cookie created at client side"
              );
              await createCookie("loggedIn", true, 15, true, "Strict");
              await createCookie("jwt", jwt, 15, true, "Strict");
            }
            //cookie bug bypass ends here

            await dispatch({
              type: REGISTER_SUCCESS,
              payload: payload,
            });

            await dispatch({
              type: LOGGED_IN_STATE,
            });
          } else {
            //Sever registration failed
            const payload = {
              error_message: server_response.message,
            };
            await dispatch({
              type: REGISTER_FAILED,
              payload: payload,
            });
          }
        } else {
          //Axios error
          await dispatch({
            type: REGISTER_FAILED,
            payload: "Unable to register. Please try again later",
          });
        }
      })

      .catch(async (error) => {
        await dispatch({
          type: REGISTER_FAILED,
          payload: error,
        });
      });
  };
};

export default registerAction;
