const Message = require("../model/messageModel");

async function getMessages() {
  try {
    return await Message.find();
  } catch (error) {
    console.error("取得訊息錯誤:", error);
    throw error;
  }
}

async function addMessage(data) {
  try {
    const message = new Message(data);
    return await message.save();
  } catch (error) {
    console.error("新增訊息錯誤:", error);
    throw error;
  }
}

module.exports = {
  getMessages,
  addMessage,
};
