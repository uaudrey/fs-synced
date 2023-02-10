const { WebClient } = require("@slack/web-api");
const dotenv = require("dotenv");
dotenv.config();

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

// let channelName = "#general";
// let message = "Testing variables for posting to Slack";

const postMsgSlack = async (channelName, message) => {
  try {
    const result = await client.chat.postMessage({
      channel: channelName,
      text: message,
    });
    console.log("Message posted");
  } catch (err) {
    console.log("Error:", err);
  }
};

postMsgSlack(channelName, message);

// const postToSlack = async (channelId, message) => {
//   try {
//     const result = await app.client.chat.postToSlack({
//       token: process.env.SLACK_BOT_TOKEN,
//       channel: channelId,
//       text: message,
//     });
//   } catch (err) {
//     console.log("Error:", err);
//   }
// };
