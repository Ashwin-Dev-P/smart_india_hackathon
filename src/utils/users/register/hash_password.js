const argon2 = require("argon2");

const hashPassword = async (password) => {
  var result;
  try {
    console.time("\nhashing password");
    const hashed_password = await argon2.hash(password);
    console.timeEnd("\nhashing password");

    result = {
      status: 200,
      hashed_password,
    };
  } catch (err) {
    result = {
      status: 500,
    };
  }
  return result;
};

module.exports = hashPassword;
