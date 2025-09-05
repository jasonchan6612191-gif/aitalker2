const express = require("express");
const router = express.Router();
const axios = require("axios");
const faqController = require("./faqController");

// LINE Channel Access Token，請改成自己的
const LINE_ACCESS_TOKEN =
  process.env.LINE_ACCESS_TOKEN || "你的LINE_CHANNEL_ACCESS_TOKEN";

router.post("/", async (req, res) => {
  const events = req.body.events || [];

  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const userMsg = event.message.text.toLowerCase();
      const replyToken = event.replyToken;
      const replyMsg = faqController.getAnswer(userMsg);

      try {
        await axios.post(
          "https://api.line.me/v2/bot/message/reply",
          {
            replyToken,
            messages: [{ type: "text", text: replyMsg }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
            },
          }
        );
        console.log(`LINE user said: ${userMsg}, replied with: ${replyMsg}`);
      } catch (error) {
        console.error(
          "LINE reply error:",
          error.response?.data || error.message
        );
      }
    }
  }
  res.status(200).send("OK");
});

module.exports = router;
