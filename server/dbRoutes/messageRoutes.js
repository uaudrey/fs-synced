const express = require("express");
const router = express.Router();
const { deleteMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.delete("/:messageId", protect, deleteMessage);

module.exports = router;
