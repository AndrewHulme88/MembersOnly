require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Pool } = require("pg");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "mySecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => res.render("index"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
