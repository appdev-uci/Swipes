const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { googleAuth, googleCallback, googleError } = require("../helpers/auth");

//get environment variables
require("dotenv").load();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
      passReqToCallback: true
    },
    googleAuth
  )
);

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/error",
    session: false
  }),
  googleCallback
);

router.get("/error", googleError);

module.exports = router;
