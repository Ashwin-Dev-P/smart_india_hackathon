//utils
const validName = require("../utils/student/validName");
const isValidId = require("../utils/shared/isValidId");
const isvalidTimeStamp = require("../utils/shared/isValidTimeStamp");

//repositories
const student_repository = require("../repositories/student.repository");
const class_repository = require("../repositories/class.repository");
const isValidTimeStamp = require("../utils/shared/isValidTimeStamp");

const getStudentsService = async (class_id, user_id) => {
  var result;
  if (!(await isValidId(class_id))) {
    console.error("Invalid class id", class_id);
    result = {
      message: "Unable to get students",
      status: 400,
    };
    return result;
  }

  const class_exists = await class_repository.class_exists_repository(
    class_id,
    user_id
  );

  if (class_exists !== true) {
    result = {
      message: "Class not found",
      status: 400,
    };
    return result;
  }

  const students_result = await student_repository.getStudentsRepository(
    class_id
  );

  if (!students_result) {
    result = {
      message: "No students found",
      status: 404,
    };
    return result;
  }

  result = {
    students: students_result,
    status: 200,
  };

  return result;
};

const add_student = async (name, class_id, user_id) => {
  var result;
  const valid_name_result = await validName(name);

  if (valid_name_result.status !== 200) {
    result = {
      message: valid_name_result.message,
      status: valid_name_result.status,
    };

    return result;
  }

  if (!(await isValidId(class_id))) {
    console.error("Class id is not a valid id");
    result = {
      message: "Unable to add student to the class",
      status: 500,
    };

    return result;
  }

  const class_exists = await class_repository.class_exists_repository(
    class_id,
    user_id
  );

  if (class_exists !== true) {
    result = {
      message: "Unable to find the class",
      status: 400,
    };
    return result;
  }

  try {
    const student_object = await student_repository.addStudentRepository(
      name,
      class_id,
      user_id
    );

    if (!student_object) {
      const message = "Unable to save student";
      result = {
        message: message,
        status: 500,
      };
      return result;
    } else {
      result = {
        message: "Student added",
        status: 200,
      };
      return result;
    }
  } catch (error) {
    const message = "Unable to save student";
    console.error(message, error);

    result = {
      message: message,
      status: 500,
    };
    return result;
  }
};

const markStudentAttendanceForDateService = async (
  user_id,
  class_id,
  student_ids,
  date
) => {
  if (!class_id || !student_ids || !date) {
    console.error("User input not defined", class_id, student_ids, date);
    result = {
      message: "Something went wrong",
      status: 400,
    };

    return result;
  }

  //check if date is valid timestamp
  if (!(await isValidTimeStamp(date))) {
    console.error("Date is not a valid timestamp");
    result = {
      message: "Something went wrong",
      status: 400,
    };

    return result;
  }

  //Check if valid id before query to db
  if (!(await isValidId(class_id))) {
    console.error("Class id is not a valid id");
    result = {
      message: "Something went wrong",
      status: 400,
    };

    return result;
  }

  //Check if student ids are valid before query to db
  for (var index = 0; index < student_ids.length; index++) {
    const student_id = student_ids[index];
    if (!(await isValidId(student_id))) {
      console.error("Student id is not a valid id");
      result = {
        message: "Something went wrong",
        status: 400,
      };

      return result;
    }
  }

  //check if user has access to the class or the class is present
  const class_exists = await class_repository.class_exists_repository(
    class_id,
    user_id
  );

  if (!class_exists) {
    result = {
      message: "Class not found",
      status: 404,
    };
    return result;
  }

  try {
    //mark attendance for each student
    for (var index = 0; index < student_ids.length; index++) {
      const student_id = student_ids[index];
      await student_repository.addStudentPresentDateRepository(
        student_id,
        date
      );
    }

    result = {
      message: "Attendance marked",
      status: 200,
    };
  } catch (error) {
    console.error("Something went wrong", error);

    result = {
      message: "Unable to mark attendance",
      status: 500,
    };
  }

  return result;
};

module.exports = {
  add_student,
  getStudentsService,
  markStudentAttendanceForDateService,
};
