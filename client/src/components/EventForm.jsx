import React, { useState } from "react";


const EventForm = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Describe your event..."
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="button">
        Generate
      </button>
    </form>
  );
};

export default EventForm;