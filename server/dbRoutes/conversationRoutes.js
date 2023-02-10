const express = require("express");
const router = express.Router();
const {
  getConversations,
  createConversation,
  deleteConversation,
  getMessages,
  createMessage,
} = require("../controllers/conversationController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getConversations)
  .post(protect, createConversation);
router.route("/:conversationId").delete(protect, deleteConversation);
router
  .route("/:conversationId/messages")
  .get(protect, getMessages)
  .post(protect, createMessage);

// router.get("/", getConversations);
// router.post("/", createConversation);
// router.delete("/:conversationID", deleteConversation);

// router.get("/:conversationID/messages");
// router.post("/:conversationID/messages");

module.exports = router;
