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

const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const serverRouter = require("./apiCalls/slackEventRoutes");
app.use("/default/synced-lambda/", serverRouter);

const oauthRouter = require("./apiCalls/slackOauthRoutes");
app.use("/default/synced-lambda/auth/slack", oauthRouter);

const userRouter = require("./dbRoutes/userRoutes");
app.use("/default/synced-lambda/users", userRouter);

const conversationsRouter = require("./dbRoutes/conversationRoutes");
app.use("/default/synced-lambda/conversations", conversationsRouter);

const messagesRouter = require("./dbRoutes/messageRoutes");
app.use("/default/synced-lambda/messages", messagesRouter);

app.get("/default/synced-lambda", (req, res) => res.send("Namaste 🙏"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  exports.handler = serverless(app);
} else {
  // https
  //   .createServer(options, app)
  //   .listen(5000, () => console.log("Server running on port 5000"));
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
