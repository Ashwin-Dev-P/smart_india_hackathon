//repository
const class_repository = require("../repositories/class.repository");

//utils
const validClass = require("../utils/class/validClass");

//get classes of a user
const get_classes_service = async (user_id) => {
  var final_result;
  const result = await class_repository.get_classes_repository(user_id);

  if (result === null) {
    final_result = {
      classes: [],
      status: 200,
    };
  } else {
    final_result = {
      classes: result,
      status: 200,
    };
  }

  return final_result;
};

const add_class_service = async (name, year, user_id, admin) => {
  var final_result;

  //check user data validity
  const valid_class_result = await validClass(name, year, user_id, admin);
  if (valid_class_result.valid !== true) {
    final_result = {
      message: valid_class_result.message,
      status: valid_class_result.status,
    };
    return final_result;
  }

  //Save class details in database
  var add_class_result = await class_repository.add_class_repository(
    name,
    year,
    user_id
  );

  final_result = {
    message: add_class_result.message,
    status: add_class_result.status,
  };

  return final_result;
};

module.exports = {
  get_classes_service,
  add_class_service,
};
