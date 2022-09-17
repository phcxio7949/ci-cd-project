// var express = require("express");
// var router = express.Router();
// var passportGoogle = require("../auth/google");
// var passportGitHub = require("../auth/github");
// var User = require("../models/user");

// /* LOGIN ROUTER */
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Please Sign In with:' });
// });

// /* LOGOUT ROUTER */
// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

// /* GOOGLE ROUTER */
// router.get('/google',
//   passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// router.get(
//   "/google/callback",
//   passportGoogle.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/users");
//   }
// );

// /* GITHUB ROUTER */
// router.get('/github',
//   passportGitHub.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/github/callback',
//   passportGitHub.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/users');
//   });

// module.exports = router;
