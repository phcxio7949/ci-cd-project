// var passport = require('passport'), GitHubStrategy = require('passport-github').Strategy;
// var User = require('../models/user');
// const { githubClientID, githubClientSecret, githubCallBackURL } = process.env;

// passport.use(new GitHubStrategy({
//   githubClientID, githubClientSecret, githubCallBackURL
// },
//   function (accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ userid: profile.id }, { name: profile.displayName, userid: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// module.exports = passport;
