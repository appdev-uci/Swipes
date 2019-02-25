const express = require("express");
const app = express();
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const db = require("./models");
const passport = require('passport');

//get routes from routes folder
const authRoutes = require("./routes/auth");

//get general error handling from helpers
const errorHandler = require("./helpers/error");

//middleware from middleware folder
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

//passport set up
require('./services/passport');

//get environment variables
require("dotenv").load();

//to be able to parse incoming request
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//use routes from routes folder
app.use("/auth", authRoutes);

app.get("/", function(req, res) {
  console.log(req.user);
  return res.status(200).json({ Hello: "World" });
});

app.use(errorHandler);

//error handling
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("APP IS RUNNING ON PORT " + process.env.PORT);
});
