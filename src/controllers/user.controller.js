//import services
const user_services = require("../services/user.services");

//import config
const config = require("../config/config");

//register a user
const register_user_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const {
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    dob,
    highest_qualification,
    contact_number,
  } = req.body;

  console.group("User registration");

  const final_result = await user_services.register_user_service(
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    dob,
    highest_qualification,
    contact_number
  );
  const status = final_result.status;

  console.groupEnd("User registration");

  if (status && status === 200) {
    //Set login cookies
    const cookie_options = config.cookie.cookie_options;
    const jwt_cookie_options = cookie_options.jwt_cookie_option;
    const loggedIn_cookie_options = cookie_options.logged_in_cookie_option;
    const jwt = final_result.jwt;

    await res.cookie("loggedIn", true, loggedIn_cookie_options);
    await res.cookie("jwt", jwt, jwt_cookie_options);

    //Set login cookies ends
  }

  return res.json(final_result);
};

//login user
const login_user_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  console.group("\nLogin");
  console.time("login time");

  const { email, password } = req.body;

  var final_result = await user_services.login_user_service(email, password);

  const status = final_result.status;

  if (status) {
    if (status === 200) {
      //Set login cookies
      const cookie_options = await config.cookie.cookie_options;
      const jwt_cookie_options = await cookie_options.jwt_cookie_option;
      const loggedIn_cookie_options =
        await cookie_options.logged_in_cookie_option;
      const jwt = final_result.jwt;

      if (!jwt) {
        console.error("Jwt is not found");
      }

      //console.log("jwt", jwt);

      console.timeEnd("login time");
      console.groupEnd("\nLogin");

      await res.cookie("jwt", jwt, jwt_cookie_options);
      await res.cookie("loggedIn", true, loggedIn_cookie_options);
      return await res.status(status).json(final_result);
    } else {
      console.timeEnd("login time");
      console.groupEnd("\nLogin");

      console.error("Status present but not 200");
      return res.json(final_result);
    }
  } else {
    console.timeEnd("login time");
    console.groupEnd("\nLogin");
    console.error("Status code not present");
    return res.json(final_result);
  }
};

const logout_controller = async (req, res) => {
  //Clear cookies only if it is present since Mozilla Firefox browser causes warning if cleared cookies whoich are not present already.
  if (req.cookies.jwt) {
    res.clearCookie("jwt");
  } else {
    console.warn("jwt cookie not found");
    return res.status(200).json({ message: "Logged out already", status: 200 });
  }

  if (req.cookies.loggedIn) {
    res.clearCookie("loggedIn");
  } else {
    console.warn("LoggedIn cookie not found");
  }

  return res
    .status(200)
    .json({ message: "Logged out successfully", status: 200 });
};

module.exports = {
  register_user_controller,
  login_user_controller,
  logout_controller,
};
