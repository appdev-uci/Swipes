const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");

//get environment variables
require("dotenv").load();

//passport stuff
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, email, profile, done) {
      let newUser = {
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        googleId: profile.id,
        email: profile.emails[0].value
      };
      try {
        let user = await db.User.findOneAndUpdate(
          { googleId: profile.id },
          newUser,
          { upsert: true , 'new': true }
        );
        console.log(user)
        return done(null, user);
      } catch (err) {
        console.log(err)
        return done(err, null);
      }
    }
  )
);
//custom middleware
//const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

//to be able to parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//the routes you would use
//app.use("/api/user/", authRoutes);
// app.use('/api/user/:user_id/todos/',
//     loginRequired,
//     ensureCorrectUser,
//     todoRoutes);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/error",
    session: false
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    //jwt tokenize the req.user
    return res.status(200).json(req.user);
  }
);

app.get("/", function(req, res) {
  console.log(req.user)
  return res.status(200).json({ Hello: "World" });
});

app.get("/auth/error",function(req, res){
  return res.status(500).json({
    message: "Authentication went wrong. Try again later.",
    status: 500
  })
})
//error handling
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//app.use(errorHandler);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("APP IS RUNNING ON PORT " + process.env.PORT);
});
