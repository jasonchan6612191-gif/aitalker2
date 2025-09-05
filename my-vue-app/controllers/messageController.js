const Message = require("./models/messageModel");

async function getMessages() {
  return await Message.find();
}

async function addMessage(data) {
  const message = new Message(data);
  return await message.save();
}

module.exports = {
  getMessages,
  addMessage,
};
