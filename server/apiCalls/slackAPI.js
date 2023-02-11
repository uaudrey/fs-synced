const { WebClient } = require("@slack/web-api");
const { createMessage } = require("../controllers/conversationController");

const client = new WebClient();

// Slack OAuth
// app.get("/auth/slack", async (_, res) => {
const addToSlackButton = async (_, res) => {
  const userScopes =
    "channels:history,channels:read,chat:write,groups:history,im:history,mpim:history,users.profile:read,users:read";
  const redirectURL =
    "https://j16zl6cwya.execute-api.us-east-1.amazonaws.com/default/synced-lambda/auth/slack/callback";
  const url = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&user_scope=${userScopes}&redirect_uri=${redirectURL}`;

  res.status(200).header("Content-Type", "text/html; charset=utf-8")
    .send(`<html><body>
    <a href="${url}"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
    </body></html>`);
};

// app.get("/auth/slack/callback", async (req, res) => {
const slackOauthCallback = async (req, res) => {
  try {
    const response = await client.oauth.v2.access({
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code,
    });

    const identity = client.users.identity({
      token: response.authed_user.access_token,
    });

    res.status(200).send(
      `<html><body>
            <p>You have successfully logged in with your Slack account! Here are the details:</p>
            <p>Response: ${JSON.stringify(response)}</p>
            <p>Identity: ${JSON.stringify(identity)}</p></body></html>`
    );
  } catch (err) {
    console.log("Error:", err);
  }
};

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

module.exports = {
  addToSlackButton,
  slackOauthCallback,
  getDataSlackEvent,
  postMsgToSlack,
};
