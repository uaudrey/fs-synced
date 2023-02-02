const express = require("express");
const router = express.Router();
const { deleteMessage } = require("../controllers/messageController");

router.delete("/:messageId", deleteMessage);

module.exports = router;
