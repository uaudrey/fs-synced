const express = require("express");
const router = express.Router();
const {
  getConversations,
  createConversation,
  deleteConversation,
  getMessages,
  createMessage,
} = require("../controllers/conversationController");

router.route("/").get(getConversations).post(createConversation);
router.route("/:conversationId").delete(deleteConversation);
router.route("/:conversationId/messages").get(getMessages).post(createMessage);

// router.get("/", getConversations);
// router.post("/", createConversation);
// router.delete("/:conversationID", deleteConversation);

// router.get("/:conversationID/messages");
// router.post("/:conversationID/messages");

module.exports = router;
