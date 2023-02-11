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
  text: {
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
  slackChannelId: {
    type: Number,
    required: false,
  },
  slackChannelType: {
    type: String,
    required: false,
  },
  // type: {
  //   type: String,
  //   required: false,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message };
