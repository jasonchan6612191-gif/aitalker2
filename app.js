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

app.use(bodyParser.json());

// 靜態資源提供（供前端打包檔案用，根據實際編譯結果設置）
app.use(express.static(path.join(__dirname, "my-vue-app/dist")));

// 路由
app.use("/api/faq", faqRouter);
app.use("/api/message", messageRouter);

// SPA fallback，回應 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-vue-app/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
