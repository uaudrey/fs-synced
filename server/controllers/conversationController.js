const asyncHandler = require("express-async-handler");

// @desc    Get all conversations
// @route   GET /conversations
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
  return res.status(200).json({ Message: "Get all conversations" });
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
// @route   DELETE /conversations/<conversation_id>
// @access  Private
const deleteConversation = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json({ message: `Conversation ${req.params.id} successfully deleted` });
});

// @board_bp.route("/<board_id>/cards", methods=["GET"])
// def get_cards_from_board(board_id):

// @desc    Get all messages
// @route   GET /conversations/<conversation_id>/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  return res.status(200).json({ Message: "Get all messages" });
});

// @desc    Create message
// @route   POST /conversations/<conversation_id>/messages
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  return res.status(201).json({ Message: "Message successfully created" });
});

module.exports = {
  getConversations,
  createConversation,
  deleteConversation,
  getMessages,
  createMessage,
};

// app.post("/", async (req, res) => {
//   const newMessage = new Message({ ...req.body });
//   const insertedMessage = await newMessage.save();
//   return res.status(201).json(insertedMessage);
// });

// getOneConversation,
// @desc    Get one conversation
// @route   GET /conversations/<conversation_id>
// @access  Private
// const getOneConversation = asyncHandler(async (req, res) => {
//   return res.status(200).json({ Message: `Get conversation ${req.params.id}` });
// });
