const client = require("../index");
const { createMessage } = require("../controllers/conversationController");

// A POST request to '/' (the server URL without an endpoint)
// Use this to get the event data and process the event
// Grab event.channel, event.event_ts, event.user, event.channel_type
// const channelId = req.body.event.channel;
// const message = req.body.event.text;
// const timestamp = req.body.event.event_ts;
// const channelType = req.body.event.channel_type;
const getDataSlackEvent = async (req, res) => {
  const senderId = req.body.event.user;
  const senderName = getSenderData(senderId);

  req = {
    sender: senderName,
    slackChannelId: req.body.event.channel,
    text: req.body.event.text,
    platform: "slack",
    timestamp: req.body.event.event_ts,
    slackChannelType: req.body.event.channel_type,
    status: "unread",
  };

  processIncomingMessage(req, res);

  res.status(200);
};

const processIncomingMessage = (req, res) => {
  return new Promise((resolve) => {
    createMessage(req, res);
    resolve();
  });
};

const getSenderData = () => {
  return new Promise((resolve) => {
    async (senderId) => {
      let senderData;
      try {
        senderData = await client.users.profile.get({
          user: senderId,
        });
      } catch (err) {
        console.log(err);
      }

      return senderData.real_name;
    };
  });
};

const postMsgToSlack = async (channelId, message) => {
  try {
    await client.chat.postMessage({
      channel: channelId,
      text: message,
    });
    // console.log("Message posted");
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = { getDataSlackEvent, postMsgToSlack };
