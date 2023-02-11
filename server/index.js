const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const serverless = require("serverless-http");
const { WebClient } = require("@slack/web-api");
const { App, ExpressReceiver } = require("@slack/bolt");

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

export const client = WebClient();

// const boltReceiver = new ExpressReceiver({signingSecret: process.env.SLACK_SIGNING_SECRET, endpoints: '/'});
// const boltApp = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   receiver: boltReceiver
// });

// Middleware
app.use(cors());
// app.use('/', boltReceiver.router)
app.use(express.json());

// boltApp.event("member_joined_channel", ({ event }) =>
//   handleMemberJoined(event)
// );
// boltApp.event("message", ({ event }) => handleMessage(event));

// app.use(`/events/${botSubpath}`, boltReceiver.router);

// Routes
const serverRouter = require("./apiCalls/slackEventRoutes");
app.use("/default/synced-lambda/", serverRouter);
const conversationsRouter = require("./dbRoutes/conversationRoutes");
app.use("/default/synced-lambda/conversations", conversationsRouter);
const messagesRouter = require("./dbRoutes/messageRoutes");
app.use("/default/synced-lambda/messages", messagesRouter);
const userRouter = require("./dbRoutes/userRoutes");
app.use("/default/synced-lambda/users", userRouter);

// Slack OAuth
app.get("/auth/slack", async (_, res) => {
  const userScopes =
    "channels:history,channels:read,chat:write,groups:history,im:history,mpim:history,users.profile:read,users:read";
  const redirectURL =
    "https://j16zl6cwya.execute-api.us-east-1.amazonaws.com/default/synced-lambda/auth/slack/callback";
  const url = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&user_scope=${userScopes}&redirect_uri=${redirectURL}`;

  res.status(200).header("Content-Type", "text/html; charset=utf-8");
  // .send(`<html><body>
  //   <a href="${url}"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
  //   </body></html>`);
});

app.get("/auth/slack/callback", async (req, res) => {
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
});

app.get("/default/synced-lambda", (req, res) => res.send("Namaste 🙏"));

// const slackVerification = app.post("/default/synced-lambda", (req, res) => {
//   let challenge = req.body.challenge;
//   if (challenge) {
//     res.status(200);
//     res.contentType("text/plain");
//     res.send(challenge);
//   }
// });

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  exports.handler = serverless(app);
} else {
  app.listen(PORT, () => console.log(`Server started on port ${5000}`));
}
