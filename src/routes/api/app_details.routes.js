const express = require("express");
const router = express.Router();

//import controllers
const app_details_controller = require("../../controllers/app_details.controller");

//utils
const jwtLoginAuthentication = require("../../utils/users/authentication/jwtLoginAuthentication");

//routes

//get app details
router.get("/", app_details_controller.get_app_details_controller);

//post app details
router.post(
  "/",
  jwtLoginAuthentication,
  app_details_controller.post_app_details_controller
);

//patch app details
router.patch(
  "/",
  jwtLoginAuthentication,
  app_details_controller.patch_app_details_controller
);

module.exports = router;
