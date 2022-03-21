import {
  LOGIN_LOADING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
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

const loginAction = (form_data) => {
  return async (dispatch) => {
    await dispatch({
      type: LOGIN_LOADING,
    });

    const reCAPTCHA_token = form_data.reCAPTCHA_token;
    if (!reCAPTCHA_token) {
      await dispatch({
        type: LOGIN_FAILED,
        payload: "Please select the reCAPTCHA",
      });
      return;
    }

    const url = backend_url + "/api/user/login";

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
            //Login success

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
              type: LOGIN_SUCCESS,
            });

            await dispatch({
              type: LOGGED_IN_STATE,
            });
          } else {
            //Invalid credentials or login failed for some other reason
            await dispatch({
              type: LOGIN_FAILED,
              payload: server_response.message,
            });
          }
        }
      })
      .catch(async (error) => {
        console.error("Axios login error", error);

        await dispatch({
          type: LOGIN_FAILED,
          payload: error,
        });
      });
  };
};

export default loginAction;
