require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const authRoutes = require("./routes/authRoutes");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "mySecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render("index"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Database connected:', res.rows[0]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
