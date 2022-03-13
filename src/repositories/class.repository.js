//Modules
const mongoose = require("mongoose");

//Models

const ClassModel = mongoose.model("Class");

const get_classes_repository = async (user_id) => {
  const limit = 0;
  const select = "-createdAt -updatedAt -__v -staff";
  const filter = {
    staff: user_id,
  };
  const result = await ClassModel.find(filter).select(select).limit(limit);

  return result;
};

const add_class_repository = async (name, year, user_id) => {
  const class_object = await new ClassModel();

  class_object.name = name;
  class_object.year = year;
  class_object.staff = user_id;

  var result;
  try {
    var save_result = await class_object.save();
    result = {
      save_result,
      message: "Class added successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Unable to add class:", error);
    result = {
      message: "Unable to add class",
      status: 500,
      error,
    };
  }

  return result;
};

const class_exists_repository = async (class_id, user_id) => {
  //check if a class exists with this user's ownership. This prevents other users from accessing someone else's class
  const filter = {
    _id: class_id,
    staff: user_id,
  };
  const result = await ClassModel.exists(filter);

  if (!result) {
    console.warn(
      "This account doesn't have access to this class or this class doesn't exist"
    );
    return false;
  } else {
    return true;
  }
};

module.exports = {
  get_classes_repository,
  add_class_repository,
  class_exists_repository,
};
