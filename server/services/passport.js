const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models");

//get environment variables
require("dotenv").load();

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await db.User.findById(id);
    return done(null, {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    });
  } catch (err) {
    return done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
      proxy: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
      let newUser = {
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        googleId: profile.id,
        email: profile.emails[0].value
      };
      try {
        let user = await db.User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
          });
        }
        user = await new db.User(newUser).save();
        return done(null, {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname
        });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
