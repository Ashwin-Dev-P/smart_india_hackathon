//To enable .env file
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

//Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//body parser deprecation replacement
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Enable CORS
const cors = require("cors");
if (process.env.NODE_ENV === "production") {
  var corsOptions = {
    origin: [
      "https://attendance-sih.herokuapp.com",
      "http://localhost:3000",
      "http://localhost:5000",
      "http://192.168.0.150:3000",
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  };
} else {
  var corsOptions = {
    origin: [
      "https://attendance-sih.herokuapp.com",
      "http://localhost:3000",
      "http://localhost:5000",
      "http://192.168.0.150:3000",
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  };
}

app.use(cors(corsOptions));

//DB connection
require("./src/models/");

//Redirect http to https protocol
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

//import routes
const routes = require("./src/routes/");
app.use(routes);

//serve static assessts if in production
if (process.env.NODE_ENV === "production" || true) {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on   http://localhost:${PORT}`);
});
