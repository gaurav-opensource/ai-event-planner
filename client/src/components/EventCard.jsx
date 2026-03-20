const EventCard = ({ event }) => {
  if (!event) return null;

  const {
    prompt,
    venueName,
    location,
    cost,
    justification,
  } = event;

  return (
    <div className="chat-container">
      
      {/* user message */}
      <div className="chat-row user">
        <div className="chat-bubble user-bubble">
          {prompt}
        </div>
      </div>

      {/* ai response */}
      <div className="chat-row ai">
        <div className="chat-bubble ai-bubble">
          <p className="ai-title">🤖 AI Suggestion</p>

          <h3 className="venue-name">{venueName}</h3>

          <p className="meta">
            📍 {location}
          </p>

          <p className="meta">
            💰 {cost}
          </p>

          <p className="ai-desc">
            💡 {justification}
          </p>
        </div>
      </div>

    </div>
  );
};

export default EventCard;