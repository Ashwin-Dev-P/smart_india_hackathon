const argon2 = require("argon2");

const verify_password = async (hash, password) => {
  if (await argon2.verify(hash, password)) {
    return true;
  } else {
    return false;
  }
};

module.exports = verify_password;
