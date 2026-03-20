const Event = require("../models/Event_history");
const { generateEvent } = require("../services/aiService");

// Create a new event using AI
const createEvent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        message: "Please provide an event description",
      });
    }

    // calling AI service
    const aiResponse = await generateEvent(prompt);

    // saving event in DB
    const savedEvent = await Event.create({
      prompt,
      ...aiResponse,
    });

    return res.status(201).json(savedEvent);
  } catch (err) {
    console.error("Create Event Error:", err.message);

    return res.status(500).json({
      message: "Failed to create event",
    });
  }
};

// Fetch all events (latest first)
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    return res.json(events);
  } catch (err) {
    console.error("Fetch Events Error:", err.message);

    return res.status(500).json({
      message: "Could not fetch events",
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
};