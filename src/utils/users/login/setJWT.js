const jwt = require("jsonwebtoken");
require("dotenv").config();

//config
const config = require("../../../config/config");

async function setJWT(_id) {
  console.time("jwt signing time");

  const JWT_EXPIRES = Number(config.JWT_EXPIRES);
  const JWT_SECRET = process.env.JWT_SECRET;

  const token = jwt.sign({ id: _id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  console.timeEnd("jwt signing time");

  return token;
}

module.exports = setJWT;
