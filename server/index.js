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
const { App, ExpressReceiver } = require("@slack/bolt");

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

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
const conversationsRouter = require("./dbRoutes/conversationRoutes");
app.use("/default/synced-lambda/conversations", conversationsRouter);
const messagesRouter = require("./dbRoutes/messageRoutes");
app.use("/default/synced-lambda/messages", messagesRouter);
const userRouter = require("./dbRoutes/userRoutes");
app.use("/default/synced-lambda/users", userRouter);

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
