const QuestionCount = require("../models/questionCount");

const createNewCount = async (username) => {
  const count = await QuestionCount.findOne({ username });

  if (!count) {
    const newCount = await QuestionCount.create({ username, count: 0 });
    return newCount;
  }
  if (count.count === 0) {
    const newCount = await QuestionCount.findOneAndUpdate({
      username,
      count: 1,
    });
    return newCount;
  }
  if (count.updatedAt - new Date() >= 0) {
    const updateCount = await QuestionCount.findOneAndUpdate({
      username,
      count: 0,
    });
    return updateCount;
  }
  return count;
};

module.exports = { createNewCount };
