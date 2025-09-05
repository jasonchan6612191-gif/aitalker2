const express = require("express");
const router = express.Router();
const faqController = require("../faqController");

router.get("/", (req, res) => {
  res.json(faqController.getAllFaqs());
});

router.post("/", (req, res) => {
  const { question, answer } = req.body;
  faqController.addFaq(question, answer);
  res.status(201).send("FAQ added");
});

module.exports = router;
