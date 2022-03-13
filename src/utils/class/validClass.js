const validClass = async (name, year) => {
  var result = {
    valid: true,
    status: 200,
    message: "Valid class details",
  };

  //Name validation
  if (!name) {
    result.valid = false;
    result.status = 400;
    result.message = "Please enter a name for your class";
  } else if (name.trim().length < 1) {
    result.valid = false;
    result.status = 400;
    result.message =
      "Please enter a valid name for your class. Class name cannot be an empty space";
  }

  //Year validation
  if (year) {
    var starting_year = year.starting_year;
    var ending_year = year.ending_year;

    if ((starting_year && !ending_year) || (!starting_year && ending_year)) {
      result.valid = false;
      result.status = 400;
      result.message = "Please enter both the starting year and ending year";
      return result;
    }

    //check if the number is an integer
    if (isNaN(parseInt(starting_year))) {
      result.valid = false;
      result.status = 400;
      result.message = "Please enter a valid starting year";
      return result;
    } else {
      starting_year = parseInt(starting_year);
    }

    if (isNaN(parseInt(ending_year))) {
      result.valid = false;
      result.status = 400;
      result.message = "Please enter a valid ending year";
      return result;
    } else {
      ending_year = parseInt(ending_year);
    }

    if (parseInt(starting_year) > parseInt(ending_year)) {
      result.valid = false;
      result.status = 400;
      result.message = "Ending year cannot be less than the starting year";
      return result;
    }
  }

  return result;
};

module.exports = validClass;
