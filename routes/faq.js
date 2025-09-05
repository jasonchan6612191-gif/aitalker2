const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");

router.get("/", async (req, res) => {
  try {
    const faqs = await faqController.getAllFaqs();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: "取得 FAQ 失敗" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFaq = await faqController.addFaq(question, answer);
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(500).json({ error: "新增 FAQ 失敗" });
  }
});

module.exports = router;
