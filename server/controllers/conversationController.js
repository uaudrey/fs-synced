const { Conversation } = require("../models/conversationModel");
const { Message } = require("../models/messageModel");
const asyncHandler = require("express-async-handler");

// @desc    Get all conversations
// @route   GET /conversations
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find();
  return res.status(200).json(conversations);
});

// @desc    Create conversation
// @route   POST /conversations/
// @access  Private
// @req     sender, platform
const createConversation = asyncHandler(async (req, res) => {
  if (!req.body.sender || !req.body.platform) {
    res.status(400);
    throw new Error("Incomplete data");
    // .json({ Details: "Invalid Data" });
  }

  const conversation = await Conversation.create({
    sender: req.body.sender,
    platform: req.body.platform,
    type: req.body.type,
  });

  return res.status(201).json(conversation);
});

// @desc    Delete conversation
// @route   DELETE /conversations/<conversation_id>
// @access  Private
const deleteConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.conversationId);

  if (!conversation) {
    res.status(400);
    throw new Error("Conversation not found");
  }

  // await conversation.remove();
  await Conversation.deleteOne(conversation);

  return res.status(201).json({ id: req.params.conversationId });
});

// @board_bp.route("/<board_id>/cards", methods=["GET"])
// def get_cards_from_board(board_id):

// @desc    Get all messages
// @route   GET /conversations/<conversation_id>/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.conversationId);

  if (!conversation) {
    res.status(400);
    throw new Error("Conversation not found");
  }

  const messages = await Message.find({
    conversation: req.params.conversationId,
  });
  return res.status(200).json(messages);
});

// @desc    Create message
// @route   POST /conversations/<conversation_id>/messages
// @access  Private
// @req     sender, body, timestamp, platform
const createMessage = asyncHandler(async (req, res) => {
  // if (!req.body.sender || !req.body.body || !req.body.platform || !req.body.timestamp) {
  if (!req.body.sender || !req.body.body || !req.body.platform) {
    res.status(400);
    throw new Error("Incomplete data");
  }

  const conversation = await Conversation.findById(req.params.conversationId);

  if (!conversation) {
    // Create new conversation
    const conversation = createConversation(req, res);
  }

  // Add message to conversation (i.e, add conversationId to message)
  const message = await Message.create({
    conversation: req.params.conversationId,
    ...req.body,
    status: "Unread",
    type: "channel_type/none",
  });

  return res.status(201).json(message);
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
//   const insertedMessage = await newMessage.save((err) => {
//      if (err) return handleError(err);
// });
//   return res.status(201).json(insertedMessage);
// });

// getOneConversation,
// @desc    Get one conversation
// @route   GET /conversations/<conversation_id>
// @access  Private
// const getOneConversation = asyncHandler(async (req, res) => {
//   return res.status(200).json({ Message: `Get conversation ${req.params.id}` });
// });
