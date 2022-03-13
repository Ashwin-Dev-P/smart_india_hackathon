import { getCookie } from "./getCookie";

const isLogin = () => {
  if (!(getCookie("loggedIn") === "true")) {
    return false;
  }
  return true;
};

export default isLogin;
