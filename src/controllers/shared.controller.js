//import services
const shared_services = require("../services/shared.services");

const method_not_found_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const result = await shared_services.method_not_found_service();

  return res.status(404).json(result);
};

module.exports = {
  method_not_found_controller,
};
