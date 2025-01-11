const express = require("express");
const Message = require("../models/message");
const User = require("../models/user");
const router = express.Router();

router.post("/create", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }
  await Message.create({
    title: req.body.title,
    text: req.body.text,
    authorId: req.user.id,
  });
  res.redirect("/");
});

router.get("/", async (req, res) => {
  const messages = await Message.findAll({
    include: { model: User, as: "author" },
  });

  res.render("index", {
    user: req.user,
    messages: messages,
  });
});

module.exports = router;
