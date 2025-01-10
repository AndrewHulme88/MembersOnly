const express = require("express");
const bycrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();

passport.use(new LocalStrategy(async (username, pasword, done) => {
  const user = await User.findOne({ where: { email: username } });
  if (!user || !(await bycrypt.compare(password, user.password))) {
    return done(null, false, { message: "Incorrrect username or password."});
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password to short"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const hashedPassword = await bycrypt.hash(req.body.password, 10);
  await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  res.redirect("/auth/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
}));

module.exports = router;
