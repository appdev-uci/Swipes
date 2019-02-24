const db = require("../models");
const jwt = require("jsonwebtoken");

//get environment variables
require("dotenv").load();

exports.googleAuth = async function(
  request,
  accessToken,
  refreshToken,
  profile,
  done
) {
  let newUser = {
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    googleId: profile.id,
    email: profile.emails[0].value
  };
  db.User.findOneOrCreate({ googleId: profile.id }, newUser, (err, user) =>
    done(err, user)
  );
};

exports.googleCallback = function(req, res) {
  // Successful authentication, redirect home.
  const { id, email, googleId, firstname, lastname } = req.user;
  let token = jwt.sign(
    {
      id,
      googleId
    },
    process.env.SECRET_KEY
  );
  return res.status(200).json({
    token,
    id,
    email,
    firstname,
    lastname
  });
};

exports.googleError = function(req, res) {
  return res.status(500).json({
    message: "Authentication went wrong. Try again later.",
    status: 500
  });
};
