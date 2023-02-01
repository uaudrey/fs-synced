const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { MongoClient, ServerApiVersion } = require("mongodb");
const { Conversation } = require("./models/conversationModel");
const { Message } = require("./models/messageModel");
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;
dotenv.config();
const uri = process.env.MONGO_URI;
const app = express();

// Middleware
// app.use('/', express.static(path.join(__dirname, '/public')))
// app.use("/", require("./routes/root"));
app.use(cors());
app.use(express.json());
// app.use(require("./routes/record"));

// db.messages.createIndex({ messageID: 1 }, { unique: true });

const start = async () => {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to database"));

    app.listen(PORT, () => console.log(`Server started on port ${5000}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const conversationsRouter = require("./routes/conversationRoutes");
app.use("/conversations", conversationsRouter);

const messagesRouter = require("./routes/messageRoutes");
app.use("/messages", messagesRouter);
// app.use("/conversations/:id/messages", messagesRouter);

app.use(errorHandler);

start();

// const uri =
//   "mongodb+srv://uaudrey:password@capdb.iaosxkz.mongodb.net/synced_db";
// console.log(uri);
// console.log(uri_env);

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("synced_db").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
