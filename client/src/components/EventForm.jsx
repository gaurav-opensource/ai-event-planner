import React, { useState } from "react";

const EventForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedValue = query.trim();
    if (!trimmedValue) return;

    onSubmit(trimmedValue);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Describe your event (e.g. team outing for 20 people in Goa)..."
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit" className="button">
        Generate
      </button>
    </form>
  );
};

export default EventForm;