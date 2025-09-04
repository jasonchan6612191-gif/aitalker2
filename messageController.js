let messages = [];

function getMessages() {
  return messages;
}

function addMessage(message) {
  messages.push(message);
}

module.exports = {
  getMessages,
  addMessage,
};
