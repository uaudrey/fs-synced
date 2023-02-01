const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
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
    default: false,
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

module.exports = { Message };
