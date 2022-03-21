const express = require("express");
const router = express.Router();

//utils
const reCAPTCHAVerification = require("../../utils/users/authentication/reCAPTCHAVerification");

//import controllers
const user_controllers = require("../../controllers/user.controller");

//routes

//register user
router.post("/", user_controllers.register_user_controller);

//login user
router.post(
  "/login",
  reCAPTCHAVerification,
  user_controllers.login_user_controller
);

//logout
router.get("/logout", user_controllers.logout_controller);

module.exports = router;
