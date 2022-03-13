const validEmail = require("./valid_email");
const validPassword = require("./valid_password");
const validName = require("./valid_name");

//validate user
const validUser = async (
  email,
  password,
  password_confirmation,
  first_name,
  last_name,
  dob,
  contact_number
) => {
  var result = {
    message: "",
    valid: "",
    status: "",
  };

  //Check for email validity
  const valid_email = await validEmail(email);
  if (valid_email.valid !== true) {
    result = {
      message: valid_email.message,
      valid: false,
      status: 400,
    };
    return result;
  }

  //check for valid password
  const valid_password = await validPassword(password, password_confirmation);
  if (valid_password.valid !== true) {
    result = {
      message: valid_password.message,
      valid: false,
      status: 400,
    };
    return result;
  }

  //check for valid name
  const valid_name = await validName(first_name, last_name);
  if (valid_name.valid !== true) {
    result = {
      message: valid_name.message,
      valid: false,
      status: 400,
    };
    return result;
  }

  //return valid result since no errors have been detected
  result = {
    message: "Valid user data",
    valid: true,
    status: 202,
  };
  return result;
};

module.exports = validUser;
