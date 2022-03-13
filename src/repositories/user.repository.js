//Modules
const mongoose = require("mongoose");

//Models

const UserModel = mongoose.model("user");

const createUser = async (
  email,
  hashed_password,
  first_name,
  last_name,
  dob,
  contact_number,
  highest_qualification
) => {
  const user = new UserModel();

  //user.validate();

  user.first_name = first_name;
  user.last_name = last_name;
  user.password = hashed_password;
  user.email = email;
  user.contact_number = contact_number;
  user.dob = dob;
  user.highest_qualification = highest_qualification;

  //Used to validate data using schema
  /*
  const err = await user.validateSync();
  console.log(err);
  */

  console.time("\nUser save time");
  await user.save();
  console.timeEnd("\nUser save time");

  delete user.password;
  return user;
};

//Used for login
const get_user_by_email_repository = async (email) => {
  const filter = {
    email: email,
  };
  const user = await UserModel.findOne(filter).select("id email password");
  return user;
};

module.exports = {
  createUser,
  get_user_by_email_repository,
};
