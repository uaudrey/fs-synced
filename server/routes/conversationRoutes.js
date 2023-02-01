const express = require("express");
const router = express.Router();
const {
  getConversations,
  getOneConversation,
  createConversation,
  deleteConversation,
} = require("../controllers/conversationController");

router.route("/").get(getConversations).post(createConversation);
router.route("/:id").get(getOneConversation).delete(deleteConversation);

// router.get("/", getConversations);
// router.get("/:id", getOneConversation);
// router.post("/", createConversation);
// router.delete("/:id", deleteConversation);

module.exports = router;

// app.get("/conversations", async (req, res) => {
//   return res.json({ message: "Hello, World ✌️" });
// });
