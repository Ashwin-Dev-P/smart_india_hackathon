//import services
const student_servcies = require("../services/student.service");

const addStudentController = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { name, class_id, user_id } = req.body;

  console.group("Add student to class");
  const final_result = await student_servcies.add_student(
    name,
    class_id,
    user_id
  );
  console.groupEnd("Add student to class");

  return res.json(final_result);
};

const getStudentsController = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { class_id, user_id } = req.body;

  const final_result = await student_servcies.getStudentsService(
    class_id,
    user_id
  );

  return res.json(final_result);
};

const markAttendanceController = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { class_id, user_id, student_ids, date } = req.body;

  const final_result =
    await student_servcies.markStudentAttendanceForDateService(
      user_id,
      class_id,
      student_ids,
      date
    );

  return res.json(final_result);
};

module.exports = {
  addStudentController,
  getStudentsController,
  markAttendanceController,
};
