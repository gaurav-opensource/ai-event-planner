const SearchHistory = ({ events }) => {
  return (
    <div className="history-container">
      {events.map((event, index) => (
        <div key={index} className="history-item">
          {event.prompt}
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;