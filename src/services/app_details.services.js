//repositories
const app_details_repository = require("../repositories/app_details.repository");
const validate_app_details = require("../utils/app_details/validate_app_details");

const get_app_details_service = async () => {
  var result;

  result = await app_details_repository.get_app_details_repository();

  if (result === null) {
    console.info("No app details data is present in the database");
    result = {
      status: 200,
    };
  }

  return result;
};

const post_app_details_service = async (
  name,
  email,
  phone_number,
  whatsapp_number,
  facebook,
  intro
) => {
  var result;

  var valid_details_result = await validate_app_details(
    name,
    email,
    phone_number,
    whatsapp_number,
    facebook
  );

  if (valid_details_result.status !== 200) {
    result = {
      message: valid_details_result.message,
      status: valid_details_result.status,
    };
    return result;
  }

  try {
    result = await app_details_repository.create_app_details_repository(
      name,
      email,
      phone_number,
      whatsapp_number,
      facebook,
      intro
    );
  } catch (error) {
    console.error(error);
    result = {
      message: "Unable to add application details",
      status: 400,
      error,
    };
  }

  return result;
};

const patch_app_details_service = async (
  name,
  email,
  phone_number,
  whatsapp_number,
  facebook,
  intro
) => {
  var result;
  var app_details;

  var valid_details_result = await validate_app_details(
    name,
    email,
    phone_number,
    whatsapp_number,
    facebook
  );

  if (valid_details_result.status !== 200) {
    result = {
      message: valid_details_result.message,
      status: valid_details_result.status,
    };
    return result;
  }

  try {
    app_details = await app_details_repository.update_app_details_repository(
      name,
      email,
      phone_number,
      whatsapp_number,
      facebook,
      intro
    );
  } catch (error) {
    result = {
      message: "Unable to update application details",
      status: 500,
      error: error,
    };
    console.error(result.message);
    console.error(error);
    return result;
  }

  try {
    //If no app details is present in the database
    if (
      app_details === null ||
      app_details.matchedCount === 0 ||
      app_details.modifiedCount === 0
    ) {
      const additional_message =
        "No app details present in the database so new data has been created";
      console.warn(additional_message);
      app_details = await app_details_repository.create_app_details_repository(
        name,
        email,
        phone_number,
        whatsapp_number,
        facebook,
        intro
      );

      result = {
        message: "Application details added",
        status: 200,
        additional_message: additional_message,
      };
    } else if (
      app_details.acknowledged === true &&
      app_details.modifiedCount === 1
    ) {
      result = {
        message: "Application details updated",
        status: 200,
      };
    } else {
      result = {
        app_details,
        message: "Application details updation unacknowledged",
        status: 500,
      };
    }
  } catch (error) {
    result = {
      message: "Unable to add application details",
      status: 500,
      error: error,
    };
    console.error(result.message);
    console.error(error);
    return result;
  }

  return result;
};

module.exports = {
  get_app_details_service,
  post_app_details_service,
  patch_app_details_service,
};
