const isValidTimeStamp = async (timestamp) => {
  var valid = new Date(timestamp).getTime() > 0;
  if (valid) {
    return true;
  } else {
    return false;
  }
};

module.exports = isValidTimeStamp;
