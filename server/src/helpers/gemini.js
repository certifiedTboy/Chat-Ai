const { GoogleGenAI } = require("@google/genai");

const envVariable = require("../config/index");

const { GEMINI_API_KEY } = envVariable;

const genAI = new GoogleGenAI({
  key: GEMINI_API_KEY,
});

const runGeminiConversation = async (prompt) => {
  try {
    const response = await genAI?.models?.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    return { result: response.text };
  } catch (error) {
    return { error: "Something went wrong while processing your request." };
  }
};

module.exports = { runGeminiConversation };
