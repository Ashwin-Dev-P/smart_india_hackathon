const express = require("express");
const router = express.Router();

//import controllers
const student_controllers = require("../../controllers/student.controller");

//routes
router.post("/", student_controllers.addStudentController);
router.post("/get_students", student_controllers.getStudentsController);
router.post("/mark_attendance", student_controllers.markAttendanceController);

module.exports = router;
