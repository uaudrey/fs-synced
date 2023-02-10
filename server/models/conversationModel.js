const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    // messages: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Message",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
