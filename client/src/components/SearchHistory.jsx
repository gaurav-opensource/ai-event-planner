const SearchHistory = ({ events = [], onSelect, selectedId }) => {
  if (!events.length) {
    return (
      <div className="history-container empty">
        <p>No history yet</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      {events.map((item) => {
        const isActive = selectedId === item._id;

        return (
          <div
            key={item._id}
            className={`history-item ${isActive ? "active" : ""}`}
            onClick={() => onSelect(item)}
            title={item.prompt} // helpful for long text
          >
            {item.prompt.length > 40
              ? item.prompt.slice(0, 40) + "..."
              : item.prompt}
          </div>
        );
      })}
    </div>
  );
};

export default SearchHistory;