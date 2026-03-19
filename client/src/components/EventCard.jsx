const EventCard = ({ event }) => {
  console.log("Rendering EventCard with event:", event);

  return (
    <div className="card">

      {/* USER PROMPT */}
      <div className="user-query">
        <p className="label">🧑 You:</p>
        <p className="prompt">{event.prompt}</p>
      </div>

      {/* AI RESPONSE */}
      <div className="ai-response">
        <p className="label">🤖 AI Suggestion:</p>

        <h2 className="card-title">{event.venueName}</h2>

        <p className="card-text">📍 {event.location}</p>
        <p className="card-text">💰 {event.cost}</p>

        <p className="card-desc">
          💡 {event.justification}
        </p>
      </div>

    </div>
  );
};

export default EventCard;