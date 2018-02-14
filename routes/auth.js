const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport')
const User = require("../models/User");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const {username} = req.body;
  const {password} = req.body;
  const {email} = req.body;

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate username, email and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
  
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/auth/login"
}));

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/"
}));

  authRoutes.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  authRoutes.get('/google/callback',
          passport.authenticate('google', {
                  successRedirect : '/profile',
                  failureRedirect : '/'
          }));


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}


module.exports = authRoutes;