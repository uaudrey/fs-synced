const express = require("express");
const router = express.Router();
const {
  createConversation,
  createMessageServer,
  getConversations,
  deleteConversation,
  getMessages,
  createMessageUser,
} = require("../controllers/conversationController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getConversations)
  .post(createConversation)
  .delete(protect, deleteConversation);
// router.route("/:conversationId").delete(protect, deleteConversation);

router
  .route("/messages")
  .get(protect, getMessages)
  .post(protect, createMessageUser)
  .post(createMessageServer);

module.exports = router;
