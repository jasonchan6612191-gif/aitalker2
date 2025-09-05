const Faq = require("../model/faqModel");

async function getAllFaqs() {
  try {
    return await Faq.find();
  } catch (error) {
    console.error("取得 FAQ 錯誤:", error);
    throw error;
  }
}

async function addFaq(question, answer) {
  try {
    const faq = new Faq({ question, answer });
    return await faq.save();
  } catch (error) {
    console.error("新增 FAQ 錯誤:", error);
    throw error;
  }
}

async function getAnswer(userMsg) {
  try {
    const faqs = await Faq.find();
    const found = faqs.find((f) => userMsg.includes(f.question));
    return found ? found.answer : "抱歉，我沒聽懂你的問題。";
  } catch (error) {
    console.error("取得 FAQ 回答錯誤:", error);
    return "抱歉，系統發生錯誤，請稍後再試。";
  }
}

module.exports = {
  getAllFaqs,
  addFaq,
  getAnswer,
};
