const { Conversation } = require("../models/conversationModel");
const { Message } = require("../models/messageModel");
const { User } = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const postMsgSlack = require("../apiCalls/slackAPI");

// SERVER --> DATABASE
// @desc    Create conversation
// @route   POST /conversations
// @access  Private- SERVER
// @req     sender, platform
const createConversation = asyncHandler(async (req, res) => {
  if (
    !req.body.sender ||
    !req.body.platform ||
    req.body.platformConversationId
  ) {
    // if (!req.body.sender || !req.body.platform) {
    res.status(400);
    throw new Error("Incomplete data");
  }

  const conversation = await Conversation.create({
    user: req.body.userId,
    sender: req.body.sender,
    platform: req.body.platform,
    type: req.body.type,
    platformConversationId: req.body.platformConversationId,
  });

  return res.status(201).json(conversation);
});

const createMessageServer = asyncHandler(async (req, res) => {
  if (!req.text) {
    res.status(400);
    throw new Error("Incomplete data");
  }

  const user = await User.findById(req.user);
  console.log(user);
  let conversation;

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  conversation = await Conversation.find()
    .where(platform)
    .equals(req.platform)
    .where(platformConversationId)
    .equals(req.platformConversationId);

  if (!conversation) {
    // Create new conversation
    request = {
      user: req.user,
      sender: req.sender,
      platform: req.platform,
      platformConversationId: req.platformConversationId,
      type: req.type,
    };
    conversation = createConversation(request, res);
  }

  // Add message to conversation (i.e, add conversationId to message)
  const message = await Message.create({
    conversation: req.params.conversationId,
    ...req.body,
  });

  // If Slack Conversation, post message to Slack
  // const channelId = conversation.slackChannelId;
  // if (conversation.platform === "slack") {
  //   postMsgSlack(channelId, message);
  // }

  return res.status(201).json(message);
});

// USER --> DATABASE

// @desc    Get all conversations
// @route   GET /conversations
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({ user: req.user.id });
  return res.status(200).json(conversations);
});

// @desc    Delete conversation
// @route   DELETE /conversations/<conversationId>
// @access  Private
const deleteConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.conversationId);

  if (!conversation) {
    res.status(400);
    throw new Error("Conversation not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if logged in user matches the conversation user
  if (conversation.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // await conversation.remove();
  await Conversation.deleteOne(conversation);

  return res.status(201).json({ id: req.params.conversationId });
});

// @desc    Get all messages
// @route   GET /conversations/<conversationId>/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.conversationId);

  if (!conversation) {
    res.status(400);
    throw new Error("Conversation not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if logged in user matches the conversation user
  if (conversation.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const messages = await Message.find({
    conversation: req.params.conversationId,
  });
  return res.status(200).json(messages);
});

// @desc    Create message
// @route   POST /conversations/<conversationId>/messages
// @access  Private
// @req     sender, body, timestamp, platform
const createMessageUser = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Incomplete data");
  }

  let conversation;
  const user = await User.findById(req.user.id);

  conversation = await Conversation.findById(req.query.conversationId);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if logged in user matches the conversation user
  if (conversation.user.toString() != user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Add message to conversation (i.e, add conversationId to message)
  const message = await Message.create({
    conversation: req.params.conversationId,
    user: req.user,
    ...req.body,
  });

  // If Slack Conversation, send/post message to Slack
  // const channelId = conversation.platformConversationId;
  // const text = message.text;
  // if (conversation.platform === "slack") {
  //   postMsgSlack(channelId, text);
  // }

  return res.status(201).json(message);
});

module.exports = {
  createConversation,
  createMessageServer,
  getConversations,
  deleteConversation,
  getMessages,
  createMessageUser,
};
