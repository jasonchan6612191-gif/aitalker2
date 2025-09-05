require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const faqRouter = require("./routes/faq");
const messageRouter = require("./routes/message");

const app = express();

// MongoDB 連接
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// 請求 JSON Body 解析器
app.use(bodyParser.json());

// 靜態資源提供（供前端打包檔案用）
app.use(express.static(path.join(__dirname, "my-vue-app/dist")));

// API 路由
app.use("/api/faq", faqRouter);
app.use("/api/message", messageRouter);

// 沒有匹配路由時回傳前端 SPA 頁面
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-vue-app/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
