const config = {
  app: {
    PORT: 5000,
  },
  db: {
    name: "SIH",
    USE_MONGODB_ATLAS: true,
  },
  JWT_EXPIRES: 900000, //15 MINUTES,
  cookie: {
    cookie_options: {
      jwt_cookie_option: {
        path: "/",
        expires: new Date(Date.now() + 900000),
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: true,
        //sameSite: "none",
        sameSite: process.env.NODE_ENV === "production" ? true : false,
      },
      logged_in_cookie_option: {
        path: "/",
        expires: new Date(Date.now() + 900000),
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: false,
        //sameSite: "none",
        sameSite: process.env.NODE_ENV === "production" ? true : false,
      },
    },
  },
};

module.exports = config;
