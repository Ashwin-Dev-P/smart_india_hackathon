//import constants
const constants = require("../../../constants/constants");

//functions
const validName = async (first_name, last_name) => {
  var result = {
    message: "",
    status: "",
    valid: "",
  };

  //Check if first name exists
  if (!first_name || first_name.trim().length < 1) {
    result.valid = false;
    result.message = "Please enter your first name";
    result.status = 400;
    return result;
  }

  //check if name contains only alphabets and spaces
  const regex = constants.regex.onlyNameAndSpaces;
  if (!regex.test(first_name)) {
    result.valid = false;
    result.message =
      "Please enter a valid first name. First name should contain only alphabets and spaces";
    result.status = 400;
    return result;
  }

  //Check if last name is valid ONLY if the last name exists
  if (last_name && last_name.trim().length > 0 && !regex.test(last_name)) {
    console.log("invalid last name");
    result.valid = false;
    result.message =
      "Please enter a valid last name. Last name should contain only alphabets and spaces";
    result.status = 400;
    return result;
  }

  //return valid name since no error detected
  result.valid = true;
  result.message = "Valid name";
  result.status = 200;
  return result;
};

module.exports = validName;
