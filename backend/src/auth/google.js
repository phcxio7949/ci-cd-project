// var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// var User = require("../models/user");
// const { googleClientID, googleClientSecret, googleCallBackURL } = process.env;

// passport.use(
//   new GoogleStrategy(
//     {
//       googleClientID,
//       googleClientSecret,
//       googleCallBackURL,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate(
//         { userid: profile.id },
//         { name: profile.displayName, userid: profile.id },
//         function (err, user) {
//           return done(err, user);
//         }
//       );
//     }
//   )
// );

// module.exports = passport;
