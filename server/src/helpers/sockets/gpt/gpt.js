const OpenAI = require("openai");
const envVariable = require("../../../config/index");

const openai = new OpenAI({
  apiKey: envVariable.OPEN_AI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

const runConversation = async (text) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: text }],
      model: "gpt-3.5-turbo",
      format: "html",
    });

    return chatCompletion?.choices[0]?.message?.content;
  } catch (error) {
    return {
      error:
        "This is not you, I am currently having issues processing your question. You can perhaps check back later...",
    };
  }
};

module.exports = runConversation;
