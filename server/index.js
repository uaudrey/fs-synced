mongoose.set("strictQuery", false);
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { Message } = require("./models");

const PORT = process.env.PORT || 5000;
dotenv.config();
const uri = process.env.MONGO_URI;
const app = express();

// Middleware
// app.use('/', express.static(path.join(__dirname, '/public')))
// app.use("/", require("./routes/root"));
app.use(cors());
app.use(express.json());

// db.messages.createIndex({ messageID: 1 }, { unique: true });

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

const start = async () => {
  try {
    await mongoose.connect(uri);
    app.listen(5000, () => console.log("Server started on port 5000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.post("/", async (req, res) => {
  // const MessageSchema = new mongoose.Schema({
  //   body: {
  //     type: String,
  //     required: true,
  //   },
  // });
  // const Message = mongoose.model("Message", MessageSchema);

  const newMessage = new Message({ ...req.body });
  const insertedMessage = await newMessage.save();
  return res.status(201).json(insertedMessage);

  // return res.json({ message: "Hello, World ✌️" });
});

start();

// const uri =
//   "mongodb+srv://uaudrey:mEZEnwanyi32@capdb.iaosxkz.mongodb.net/synced_db";
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
