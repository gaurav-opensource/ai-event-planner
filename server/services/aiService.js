const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// NOTE: might move this to config later
const MODEL_NAME = "gemini-2.5-flash";

const generateEvent = async (userPrompt) => {
  try {
    if (!userPrompt || userPrompt.trim() === "") {
      throw new Error("Prompt is missing");
    }

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
    });

    const finalPrompt = `
      You are an AI Event Planner.

      Return ONLY valid JSON.
      Do not include markdown or explanations.

      Format:
      {
        "venueName": "",
        "location": "",
        "cost": "",
        "justification": ""
      }

      User request:
      ${userPrompt}
      `;

    const result = await model.generateContent(finalPrompt);

    let rawText = result.response.text();

    // sometimes Gemini wraps response in markdown
    rawText = rawText.replace(/```json|```/g, "").trim();

    let data;

    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      console.warn("JSON parse failed, using fallback response");

      // fallback if AI gives broken JSON
      data = {
        venueName: "Suggested Venue",
        location: "India",
        cost: "₹2-3 Lakhs",
        justification: rawText,
      };
    }

    return data;
  } catch (err) {
    console.error("generateEvent error:", err.message);

    // final fallback (never break API)
    return {
      venueName: "Corporate Retreat Resort",
      location: "Manali, India",
      cost: "₹3.5 Lakhs",
      justification:
        "Good for team offsites with scenic environment and all facilities.",
    };
  }
};



module.exports = { generateEvent };