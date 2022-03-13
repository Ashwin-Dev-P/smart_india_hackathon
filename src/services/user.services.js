//import utils
const valid_user_function = require("../utils/users/register/valid_user");
const hash_password = require("../utils/users/register/hash_password");
const validEmail = require("../utils/users/register/valid_email");
const verify_password = require("../utils/users/login/verify_password");
const setJWT = require("../utils/users/login/setJWT");

//import repositories
const {
  createUser,
  get_user_by_email_repository,
} = require("../repositories/user.repository");

//import constants
const constants = require("../constants/constants");
const PASSWORD_MIN_REQUIRED_LENGTH = constants.PASSWORD_MIN_REQUIRED_LENGTH;

//services
const register_user_service = async (
  email,
  password,
  password_confirmation,
  first_name,
  last_name,
  dob,
  highest_qualification,
  contact_number
) => {
  var result;

  const valid_user = await valid_user_function(
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    dob,
    contact_number
  );

  if (valid_user.valid !== true) {
    result = {
      message: valid_user.message,
      status: valid_user.status,
    };
  } else {
    //Hash the password
    const hash_password_result = await hash_password(password);
    if ((await hash_password_result).status !== 200) {
      console.error("Error hashing the password");
      result = {
        message: "Unable to register",
        status: 500,
      };
    } else {
      const hashed_password = hash_password_result.hashed_password;

      try {
        const user = await createUser(
          email,
          hashed_password,
          first_name,
          last_name,
          dob,
          contact_number,
          highest_qualification
        );

        console.log("\nSaved user data:", user);

        const json_web_token = await setJWT(user._id);
        result = {
          message: "Registered successfully",
          status: 200,
          jwt: json_web_token,
        };
      } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
          result = {
            message: `Email id ${error.keyValue.email} is already in use by another account`,
            status: 400,
          };
        } else {
          console.error(error);
          result = {
            status: 500,
            message: "Unable to register",
            error: error,
          };
        }
      }
    }
  }

  return result;
};

//login
const login_user_service = async (email, password) => {
  var result;

  if (!email || email.trim().length < 3) {
    result = {
      message: "Please enter an email id",
      status: 400,
    };
    return result;
  }

  if (!password || password.trim().length < PASSWORD_MIN_REQUIRED_LENGTH) {
    result = {
      message: "Please enter a password",
      status: 400,
    };
    return result;
  }

  const valid_email_result = await validEmail(email);
  if (valid_email_result.valid !== true) {
    result = {
      message: "Please enter a valid email",
      status: 400,
    };
  } else {
    const user = await get_user_by_email_repository(email);

    //User will be undefined if the email is not registered
    if (!user) {
      console.log("Email id is not registered");
      result = {
        message: "Invalid credentials",
        status: 401,
      };
    } else {
      //check if the password is correct
      try {
        var verify_password_check = await verify_password(
          user.password,
          password
        );
      } catch (error) {
        console.error("argon2 verify password function throws error \n", error);
      }

      if (verify_password_check !== true) {
        console.log("Invalid password");
        result = {
          message: "Invalid credentails",
          status: 401,
        };
      } else {
        const json_web_token = await setJWT(user._id);
        result = {
          message: "Login success",
          status: 200,
          jwt: json_web_token,
        };
      }
    }
  }

  return result;
};

module.exports = {
  register_user_service,
  login_user_service,
};
