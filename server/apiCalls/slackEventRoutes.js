const express = require("express");
const router = express.Router();
const { getDataSlackEvent } = require("./slackAPI");

router.post("/", getDataSlackEvent);

module.exports = router;
