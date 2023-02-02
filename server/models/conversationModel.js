const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
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
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
