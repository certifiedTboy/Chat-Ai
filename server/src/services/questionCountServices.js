const QuestionCount = require("../models/questionCount");

/**
 * @method createCount
 * @param {string} username
 * @return {Object<QuestionCount>}
 */
const createCount = async (username) => {
  const count = await QuestionCount.findOne({ username });

  if (!count) {
    return await QuestionCount.create({ username, count: 0 });
  }

  const currentDate = new Date();
  if (count.updatedAt - currentDate >= 0) {
    await QuestionCount.findOneAndUpdate({
      username,
      count: 0,
    });
  }
};

/**
 * @method updateUserPassword
 * @param {string} username
 * @return {Object<QuestionCount>}
 */
const createNewCount = async (username) => {
  const count = await QuestionCount.findOne({ username });

  if (count.count === 0) {
    const newCount = await QuestionCount.findOneAndUpdate({
      username,
      count: 1,
    });
    return newCount;
  }

  return count;
};

module.exports = { createNewCount, createCount };
