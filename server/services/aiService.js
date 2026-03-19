const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("API KEY:", process.env.GEMINI_API_KEY);

const generateEvent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(`
        You are an AI Event Planner.

        STRICT RULES:
        - Return ONLY valid JSON
        - No markdown
        - No explanation

        Format:
        {
        "venueName": "",
        "location": "",
        "cost": "",
        "justification": ""
        }

        User request:
        ${prompt}
    `);

    let text = result.response.text();

    // ✅ Clean response (same as your working logic)
    text = text.replace(/```json|```/g, "").trim();

    let parsed;
    console.log("Raw AI Response:", text);

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.log("⚠️ JSON parse failed, returning raw");

      // fallback if JSON breaks
      parsed = {
        venueName: "AI Generated Venue",
        location: "India",
        cost: "$3000",
        justification: text, // raw text show kar dena
      };
    }

    return parsed;

  } catch (error) {
    console.error("AI Error:", error);

    // ✅ Final fallback (no crash)
    return {
      venueName: "Premium Conference Resort",
      location: "Manali, India",
      cost: "$3500",
      justification: "Ideal for team retreats with scenic views and budget fit.",
    };
  }
};

module.exports = { generateEvent };