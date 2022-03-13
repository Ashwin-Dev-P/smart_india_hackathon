const express = require("express");
const router = express.Router();

//import routes
const api_routes = require("./api");

router.use("/api", api_routes);

module.exports = router;
