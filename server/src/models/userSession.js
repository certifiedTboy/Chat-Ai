const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSessionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    picture: {
      type: String,
      required: true,
    },

    authToken: {
      type: String,
      required: true,
    },

    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: 3600 },
    },
  },
  { timestamps: true }
);

const UserSession = mongoose.model("userSession", userSessionSchema);

module.exports = UserSession;
