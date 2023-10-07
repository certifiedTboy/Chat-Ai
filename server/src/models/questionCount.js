const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const questionCountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const QuestionCount = mongoose.model("questionCount", questionCountSchema);

module.exports = QuestionCount;
