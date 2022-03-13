const class_services = require("../services/class.services");

const get_classes_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { user_id } = req.body;

  const final_result = await class_services.get_classes_service(user_id);

  return res.json(final_result);
};

const add_class_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { name, year, user_id, admin } = req.body;
  const final_result = await class_services.add_class_service(
    name,
    year,
    user_id,
    admin
  );

  return res.json(final_result);
};

module.exports = {
  get_classes_controller,
  add_class_controller,
};
