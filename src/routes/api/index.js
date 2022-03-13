const express = require("express");
const router = express.Router();

//import controller
const shared_controllers = require("../../controllers/shared.controller");

//import routes
const user_routes = require("./users.routes");
const app_details_routes = require("./app_details.routes");
const class_routes = require("./class.routes");
const student_routes = require("./student.routes");

//utils
const jwtLoginAuthentication = require("../../utils/users/authentication/jwtLoginAuthentication");

router.use("/user", user_routes);
router.use("/app_details", app_details_routes);
router.use("/class", jwtLoginAuthentication, class_routes);
router.use("/student", jwtLoginAuthentication, student_routes);

//Method or route not found
router.all("*", shared_controllers.method_not_found_controller);

module.exports = router;
