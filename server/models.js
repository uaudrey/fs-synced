const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  messageID: {
    type: Number,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  // attachments: img/url,
  timestamp: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

const ConversationSchema = new mongoose.Schema({
  conversation_id: {
    type: Number,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

const Message = mongoose.model("Message", MessageSchema);
const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Message, Conversation };
