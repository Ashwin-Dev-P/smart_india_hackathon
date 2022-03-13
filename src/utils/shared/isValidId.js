var ObjectId = require("mongoose").Types.ObjectId;

const isValidId = async (id) => {
  if (ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = isValidId;
