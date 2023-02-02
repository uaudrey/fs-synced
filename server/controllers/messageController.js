const { Message } = require("../models/messageModel");
const asyncHandler = require("express-async-handler");

// @desc    Delete message
// @route   DELETE /messages/<message_id>
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.messageId);

  if (!message) {
    res.status(400);
    throw new Error("Message not found");
  }

  await Message.deleteOne(message);

  return res.status(201).json({ id: req.params.messageId });
});

module.exports = { deleteMessage };
