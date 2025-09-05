const express = require("express");
const router = express.Router();
const axios = require("axios");
const faqController = require("../controllers/faqController");

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || "你的WHATSAPP_TOKEN";
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "你的PHONE_NUMBER_ID";

router.post("/", async (req, res) => {
  const messages = req.body.messages || [];

  for (const message of messages) {
    if (message.type === "text") {
      const userMsg = message.text.body.toLowerCase();
      const replyMsg = await faqController.getAnswer(userMsg);
      const to = message.from;

      try {
        await axios.post(
          `https://graph.facebook.com/v16.0/${PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: "whatsapp",
            to,
            text: { body: replyMsg },
          },
          {
            headers: {
              Authorization: `Bearer ${WHATSAPP_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(
          `WhatsApp user said: ${userMsg}, replied with: ${replyMsg}`
        );
      } catch (error) {
        console.error(
          "WhatsApp reply error:",
          error.response?.data || error.message
        );
      }
    }
  }
  res.status(200).send("OK");
});

module.exports = router;
