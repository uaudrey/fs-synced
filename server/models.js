const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  id: {
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
  // type: "tbd",
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message };
