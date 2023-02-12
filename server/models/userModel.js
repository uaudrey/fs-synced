const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name."],
    },
    email: {
      type: String,
      required: [true, "Please add an email address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password."],
    },
    // slackUserId: [String],
    slackUserId: {
      type: String,
    },
    accessTokens: {
      type: String,
    },
    // slackUserId: [{ type: String }],
    // accessTokens: [],
  },
  {
    timestamps: true,
  },
  { minimize: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User };
