const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    venueName: String,
    location: String,
    cost: String,
    justification: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);