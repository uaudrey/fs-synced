const { Message } = require("../models/messageModel");
const { User } = require("../models/userModel");
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

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if logged in user matches the conversation user
  if (message.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Message.deleteOne(message);

  return res.status(201).json({ id: req.params.messageId });
});

module.exports = { deleteMessage };
