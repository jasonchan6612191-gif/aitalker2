let faqs = [
  { id: 1, question: "服務時間？", answer: "週一至週五 9:00-18:00" },
  { id: 2, question: "如何聯絡客服？", answer: "請使用 LINE 或 WhatsApp 聯絡" },
];

function getAllFaqs() {
  return faqs;
}

function addFaq(question, answer) {
  const newFaq = {
    id: faqs.length ? faqs[faqs.length - 1].id + 1 : 1,
    question,
    answer,
  };
  faqs.push(newFaq);
}

function getAnswer(userMsg) {
  const faq = faqs.find((f) => userMsg.includes(f.question));
  return faq ? faq.answer : "抱歉，我沒聽懂你的問題。";
}

module.exports = {
  getAllFaqs,
  addFaq,
  getAnswer,
};
