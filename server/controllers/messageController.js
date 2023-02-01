const { Message } = require("./models/messageModel");

const asyncHandler = require("express-async-handler");

// @desc    Delete message
// @route   DELETE /messages/<message_id>
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json({ message: `Message ${req.params.id} successfully deleted` });
});

module.exports = {
  deleteMessage,
};
