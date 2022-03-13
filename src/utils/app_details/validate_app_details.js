//import utils
const valid_email = require("../users/register/valid_email");
const valid_url = require("../shared/validUrl");

const validate_app_details = async (
  name,
  email,
  phone_number,
  whatsapp_number,
  facebook
) => {
  var result;

  //Application name validation
  if (!name) {
    result = {
      status: 400,
      message: "Please enter a name for your application",
    };
    return result;
  } else {
    const abbreviation = name.abbreviation;
    const expansion = name.expansion;

    if (!abbreviation || abbreviation.trim().length < 1) {
      result = {
        status: 400,
        message: "Please enter an abbreviation name for your application",
      };
      return result;
    }

    if (!expansion || expansion.trim().length < 1) {
      result = {
        status: 400,
        message: "Please enter a name expansion for your application",
      };
      return result;
    }
  }

  //email validation
  if (email && email.trim().length > 0) {
    const valid_email_result = await valid_email(email);
    if (valid_email_result.valid !== true) {
      result = {
        status: 400,
        message: valid_email_result.message,
      };
      return result;
    }
  }

  //phone number validation
  if (phone_number) {
    var number = phone_number.number;
    var country_code = phone_number.country_code;

    if ((number && !country_code) || (!number && country_code)) {
      result = {
        message:
          "Please enter both valid country code and number or leave both empty",
        status: 400,
      };
      return result;
    }

    if (!parseInt(number) || typeof parseInt(number) !== "number") {
      result = {
        message: "Please enter a valid number",
        status: 400,
      };
      return result;
    }

    if (
      !parseInt(country_code) ||
      typeof parseInt(country_code) !== "number" ||
      Number(country_code) > 999
    ) {
      result = {
        message: "Please enter a valid country code",
        status: 400,
      };
      return result;
    }

    if (Number(number) > 999999999999999) {
      result = {
        message: "Please enter a valid number",
        status: 400,
      };
      return result;
    }
  }

  //Whatsapp validation
  if (whatsapp_number) {
    var number = whatsapp_number.number;
    var country_code = whatsapp_number.country_code;
    if ((number && !country_code) || (!number && country_code)) {
      result = {
        message:
          "Please enter both valid country code and number for whatsapp or leave both empty",
        status: 400,
      };
      return result;
    }

    if (!parseInt(number) || typeof parseInt(number) !== "number") {
      result = {
        message: "Please enter a valid number for whatsapp",
        status: 400,
      };
      return result;
    }

    if (
      !parseInt(country_code) ||
      typeof parseInt(country_code) !== "number" ||
      Number(country_code) > 999
    ) {
      result = {
        message: "Please enter a valid country code for whatsapp",
        status: 400,
      };
      return result;
    }

    if (Number(number) > 999999999999999) {
      result = {
        message: "Please enter a valid number for whatsapp",
        status: 400,
      };
      return result;
    }
  }

  if (facebook && facebook.trim().length > 0 && !(await valid_url(facebook))) {
    result = {
      message: "Please enter a valid url for facebook",
      status: 400,
    };
    return result;
  }

  result = {
    message: "Valid details",
    status: 200,
    valid: true,
  };
  return result;
};

module.exports = validate_app_details;
