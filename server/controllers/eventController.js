const Event = require("../models/Event_history");
const { generateEvent } = require("../services/aiService");

// Create Event
const createEvent = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("REQ BODY:", req.body);

    // Call AI
    const aiData = await generateEvent(prompt);
    console.log("AI DATA:", aiData);

    // Save in DB
    const newEvent = await Event.create({
      prompt,
      ...aiData,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
};