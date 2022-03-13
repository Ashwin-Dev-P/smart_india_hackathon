const express = require("express");
const router = express.Router();

//controller
const class_controller = require("../../controllers/class.controller");

//get classes
router.get("/", class_controller.get_classes_controller);

//add class
router.post("/add_class", class_controller.add_class_controller);

module.exports = router;
