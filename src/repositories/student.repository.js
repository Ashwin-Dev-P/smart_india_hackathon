//Modules
const mongoose = require("mongoose");

//Models

const StudentModel = mongoose.model("Student");

const getStudentsRepository = async (class_id) => {
  const limit = 0;
  const select = "name days_present";

  const filter = {
    class: class_id,
  };
  const students = StudentModel.find(filter).limit(limit).select(select);

  return students;
};

const getStudentsOfClassByDate = async (class_id, date) => {
  const limit = 0;
  const select = "days_present";

  const filter = {
    class: class_id,
    date: {
      $elemMatch: { days_present: date },
    },
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

//used to mark absent for a student on a particular date
const markAbsentForStudentRepository = async (student_id, date) => {
  const select = "days_present";

  const student = await StudentModel.findById(student_id).select(select);

  const days_present = student.days_present;

  //remove the date from the array
  const index = days_present.indexOf(date);

  //if not found , skip
  if (index === -1) {
    return true;
  }

  days_present.splice(index, 1);

  const update = {
    days_present,
  };
  const filter = {
    _id: student_id,
  };

  const updated_student = await StudentModel.updateOne(filter, update);
  return updated_student;
};

module.exports = {
  addStudentRepository,
  getStudentsRepository,
  getStudentsOfClassByDate,
  getStudentAttendanceById,
  updateStudentPresentStatus,
  addStudentPresentDateRepository,
  markAbsentForStudentRepository,
};
