//import utils
const stringContains = require("../../shared/stringContains");

//function
const validEmail = async (email) => {
  var result = {
    message: "",
    valid: "",
  };

  //check if email is defined
  if (email === undefined || email.trim().length < 1) {
    console.log("email is undefined");

    result.valid = false;
    result.message = "Please enter an email id";

    return result;
  }

  //check if email contains '@'
  if (!(await stringContains(email, "@"))) {
    console.log(
      `Email '${email}' is invalid. Email '${email}' does not contain '@'`
    );

    result.valid = false;
    result.message = `Email '${email}' is invalid. Email '${email}' does not contain '@'`;

    return result;
  }

  //check if email contains a minimum length of 3 if split into three parts using @
  const text = email.split("@");
  if (text.length < 2) {
    console.log(`Email '${email}' is invalid`, text);

    result.valid = false;
    result.message = `Email '${email}' is invalid`;

    return result;
  } else if (text[0].trim().length < 1 || text[1].trim().length < 1) {
    console.log(`Email '${email}' is invalid`, text);

    result.valid = false;
    result.message = `Email '${email}' is invalid`;

    return result;
  }

  //check if email contains a maximum length of 320 characters
  if (email.length > 320) {
    console.log(
      `Email can have a maximum length of 320 characters. Email "${email}" is invalid`
    );

    result.valid = false;
    result.message = `Email can have a maximum lenght of 320 characters`;

    return result;
  }

  result.valid = true;
  result.message = "Valid email";

  return result;
};

module.exports = validEmail;
