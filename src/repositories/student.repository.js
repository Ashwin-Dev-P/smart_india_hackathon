//Modules
const mongoose = require("mongoose");

//Models

const StudentModel = mongoose.model("Student");

const getStudentsRepository = async (class_id) => {
  const limit = 0;
  const select = "name";

  const filter = {
    class: class_id,
  };
  const students = StudentModel.find(filter).limit(limit).select(select);

  return students;
};

const addStudentRepository = async (name, class_id) => {
  var student_object = new StudentModel();

  student_object.name = name;
  student_object.class = class_id;

  result = await student_object.save();

  return result;
};
const getStudentAttendanceById = async (_id) => {
  const select = "days_present -_id";
  const result = await StudentModel.findById(_id).select(select);
  const days_present = result.days_present;

  return days_present;
};

//Not in use yet
const updateStudentPresentStatus = async (_id, days_present) => {
  const select = "days_present name _id";

  const update = {
    days_present: days_present,
  };

  const result = await StudentModel.findByIdAndUpdate(_id, update).select(
    select
  );

  return result;
};

const addStudentPresentDateRepository = async (_id, date) => {
  const days_present = await getStudentAttendanceById(_id);

  if (!days_present.includes(date)) {
    days_present.push(date);
  }

  const filter = {
    _id: _id,
  };
  const update = {
    days_present,
  };

  const result = await StudentModel.updateOne(filter, update);

  return result;
};

module.exports = {
  addStudentRepository,
  getStudentsRepository,
  getStudentAttendanceById,
  updateStudentPresentStatus,
  addStudentPresentDateRepository,
};
