require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const lineWebhook = require("./lineWebhook");
const whatsappWebhook = require("./whatsappWebhook");
const faq = require("./faq");
const message = require("./message");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/line/webhook", lineWebhook);
app.use("/whatsapp/webhook", whatsappWebhook);
app.use("/api/faq", faq);
app.use("/api/message", message);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
