const URL = require("url").URL;

const validUrl = (my_url) => {
  try {
    new URL(my_url);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = validUrl;
