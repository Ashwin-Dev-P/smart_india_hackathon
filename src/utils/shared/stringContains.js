//contains
const stringContains = async (word, character) => {
  if (word.indexOf(character) > -1) {
    return true;
  } else {
    return false;
  }
};

module.exports = stringContains;
