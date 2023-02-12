const express = require("express");
const router = express.Router();
const { addToSlackButton, slackOauthCallback } = require("./slackAPI");
const { protect } = require("../middleware/authMiddleware");

router.get("/", addToSlackButton);
router.get("/callback", slackOauthCallback);

module.exports = router;
