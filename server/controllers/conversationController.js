const asyncHandler = require("express-async-handler");

// @desc    Get all conversations
// @route   GET /conversations
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
  return res.status(200).json({ Message: "Get all conversations" });
});

// @desc    Get one conversation
// @route   GET /conversations/<conversation_id>
// @access  Private
const getOneConversation = asyncHandler(async (req, res) => {
  return res.status(200).json({ Message: `Get conversation ${req.params.id}` });
});

// @desc    Create conversation
// @route   POST /conversations/
// @access  Private
const createConversation = asyncHandler(async (req, res) => {
  // sender, platform
  if (!req.body.sender || !req.body.platform) {
    res.status(400);
    throw new Error("Incomplete data");
    // .json({ Details: "Invalid Data" });
  }
  return res.status(201).json({ Message: "Conversation successfully created" });
});

// @desc    Delete conversation
// @route   DELETE /conversations/
// @access  Private
const deleteConversation = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json({ message: `Conversation ${req.params.id} successfully deleted` });
});

module.exports = {
  getConversations,
  getOneConversation,
  createConversation,
  deleteConversation,
};
