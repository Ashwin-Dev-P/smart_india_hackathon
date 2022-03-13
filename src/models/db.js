const mongoose = require("mongoose");
const config = require("../config/config.js");

//Constants
const USE_MONGODB_ATLAS = config.db.USE_MONGODB_ATLAS;
const DB_NAME = config.db.name;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

var uri;
if (USE_MONGODB_ATLAS === true || process.env.NODE_ENV === "production") {
  //Uses mongodb atlas cloud service
  uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@mycluster.gi2hp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
} else {
  //Uses mongodb compass localhost storage
  uri = "mongodb://localhost:27017";
}

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.error("Error connecting to the database");
      console.error(error);

      return res.json({
        message: "Error connecting to the database",
        status: 500,
        error,
      });
    } else {
      console.log("Connected to database");
    }
  }
);
