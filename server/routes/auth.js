const express = require("express");
const router = express.Router();
const passport = require("passport");
const {googleCallback, googleError, logout, getUser} = require("../helpers/auth");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/error",
  }),
  googleCallback
);

router.get("/google/error", googleError);

router.get("/logout", logout)

router.get("/user", getUser)
module.exports = router;
