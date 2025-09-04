const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", (req, res) => {
  res.json(messageController.getMessages());
});

router.post("/", (req, res) => {
  const { from, to, content, timestamp } = req.body;
  messageController.addMessage({ from, to, content, timestamp });
  res.status(201).send("Message stored");
});

module.exports = router;
