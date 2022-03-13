import { LOGGED_IN_STATE } from "./types";

import axios from "axios";

//utils
import { deleteCookie } from "../../utils/deleteCookie";

//config
import { config } from "../../config/index";
const configData = config();
const backend_url = configData.backend_url;

const logoutAction = () => {
  return async (dispatch) => {
    await deleteCookie("loggedIn");

    await dispatch({
      type: LOGGED_IN_STATE,
    });

    const url = backend_url + "/api/user/logout";

    const headers = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };
    await axios
      .get(url, headers)
      .then(async (response) => {
        if (response.status === 200) {
          return response;
        } else {
          console.error("Unable to logout");
        }
      })
      .then(async () => {
        console.info("Logged out successfully");
      })
      .catch(async (error) => {
        console.error("Ashwin", error);
      });
  };
};

export default logoutAction;
