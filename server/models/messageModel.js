const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
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
    eventTs: {
      type: String,
    },
    // timestamp: {
    //   type: Date,
    // },
    readStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    platformConversationId: {
      type: String,
      required: false,
    },
    // slackChannelType: {
    //   type: String,
    //   required: false,
    // },
    type: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message };
