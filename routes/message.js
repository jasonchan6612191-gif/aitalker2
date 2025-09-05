const express = require("express");
const router = express.Router();
const messageController = require("../messageController");

router.get("/", async (req, res) => {
  try {
    const messages = await messageController.getMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "取得訊息失敗" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { from, to, content, timestamp } = req.body;
    const message = await messageController.addMessage({
      from,
      to,
      content,
      timestamp,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "新增訊息失敗" });
  }
});

module.exports = router;
