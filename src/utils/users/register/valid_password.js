const constants = require("../../../constants/constants");
const validPassword = async (password, password_confirmation) => {
  var password_required_min_length = constants.PASSWORD_MIN_REQUIRED_LENGTH;

  var result = {
    message: "",
    valid: "",
    status: "",
  };

  //Check if password and password confirmation are defined
  if (!password || password.trim() < 1) {
    result.message = "Please enter a password";
    result.valid = false;
    result.status = 400;
    return result;
  }
  if (!password_confirmation || password_confirmation.trim() < 1) {
    result.message = "Please enter a password confirmation";
    result.valid = false;
    result.status = 400;
    return result;
  }

  //Check if password and password confirmation matches
  if (password !== password_confirmation) {
    result.message = "Both the passwords do not match";
    result.valid = false;
    result.status = 400;
    return result;
  }

  //check if the passwords match the minimum length
  if (password.trim().length < password_required_min_length) {
    result.message = `Password should have a minimum length of ${password_required_min_length}`;
    result.valid = false;
    result.status = 400;
    return result;
  }

  result.message = `Valid password`;
  result.valid = true;
  result.status = 202;
  return result;
};

module.exports = validPassword;
