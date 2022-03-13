//Modules
const mongoose = require("mongoose");

//Models

const AppDetailsModel = mongoose.model("app_details");

const get_app_details_repository = async () => {
  const result = await AppDetailsModel.findOne().select(
    "-_id -__v -updatedAt -createdAt"
  );

  return result;
};

const create_app_details_repository = async (
  name,
  email,
  phone_number,
  whatsapp_number,
  facebook,
  intro
) => {
  const app_details_object = new AppDetailsModel();
  app_details_object.name = name;
  app_details_object.email = email;
  app_details_object.phone_number = phone_number;
  app_details_object.whatsapp_number = whatsapp_number;
  app_details_object.facebook = facebook;
  app_details_object.intro = intro;

  result = app_details_object.save();

  return result;
};

const update_app_details_repository = async (
  name,
  email,
  phone_number,
  whatsapp_number,
  facebook,
  intro
) => {
  const filter = {};
  const update = {
    name,
    email,
    phone_number,
    whatsapp_number,
    facebook,
    intro,
  };

  const result = await AppDetailsModel.updateOne(filter, update);

  return result;
};

module.exports = {
  get_app_details_repository,
  create_app_details_repository,
  update_app_details_repository,
};
