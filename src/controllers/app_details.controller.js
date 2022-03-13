//services
const app_details_services = require("../services/app_details.services");

const get_app_details_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  console.group("Get app details");
  const final_result = await app_details_services.get_app_details_service();

  console.groupEnd("Get app details");

  return res.status(200).json(final_result);
};

const post_app_details_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { name, email, phone_number, whatsapp_number, facebook, intro } =
    req.body;

  const final_result = await app_details_services.post_app_details_service(
    name,
    email,
    phone_number,
    whatsapp_number,
    facebook,
    intro
  );

  return res.status(200).json(final_result);
};

const patch_app_details_controller = async (req, res) => {
  const { name, email, phone_number, whatsapp_number, facebook, intro } =
    req.body;

  const final_result = await app_details_services.patch_app_details_service(
    name,
    email,
    phone_number,
    whatsapp_number,
    facebook,
    intro
  );

  return res.status(200).json(final_result);
};

module.exports = {
  get_app_details_controller,
  post_app_details_controller,
  patch_app_details_controller,
};
