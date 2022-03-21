const axios = require("axios");
const { stringify } = require("querystring");

async function reCAPTCHAVerification(req, res, next) {
  const token = req.body.reCAPTCHA_token;

  if (!token) {
    return res.json({ status: 400, message: "reCAPTCHA verification failed" });
  }

  const secretKey =
    process.env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET_TEST_KEY;

  // Verify URL
  const query = stringify({
    secret: secretKey,
    response: token,
    remoteip: req.connection.remoteAddress,
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  const reCAPTCHA_result = await axios.get(verifyURL).then((res) => {
    return res.data;
  });

  // If not successful

  if (reCAPTCHA_result.success !== undefined && !reCAPTCHA_result.success)
    return res.json({
      success: false,
      message: "reCaptcha verification failed",
      status: 400,
    });

  return next();
}

module.exports = reCAPTCHAVerification;
