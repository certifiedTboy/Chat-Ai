const OpenAI = require("openai");
const envVariable = require("../../../config/index");

const openai = new OpenAI({
  apiKey: envVariable.OPEN_AI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

const runConversation = async (text) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion.choices[0].message.content;
};

module.exports = runConversation;
