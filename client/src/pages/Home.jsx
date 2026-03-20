import React, { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import SearchHistory from "../components/SearchHistory";
import Loader from "../components/Loader";
import { createEvent, getEvents } from "../services/api";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err.message);
    }
  };

  const handleSubmit = async (prompt) => {
    try {
      setLoading(true);

      const res = await createEvent({ prompt });
      const newEvent = res.data;

      // update history
      setEvents((prev) => [newEvent, ...prev]);

      // show latest result
      setSelectedEvent(newEvent);
      setSelectedId(newEvent._id);
    } catch (err) {
      console.error("Create event failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (event) => {
    setSelectedEvent(event);
    setSelectedId(event._id);
  };

  return (
    <div className="container">
      
      {/* sidebar */}
      <aside className={`sidebar ${!showSidebar ? "hidden" : ""}`}>
        <h2 className="sidebar-title">History</h2>

        <SearchHistory
          events={events}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
      </aside>

      {/* main content */}
      <main className="main">

        {/* header */}
        <div className="header">
          <div className="header-left">
            <span
              className="menu-btn"
              onClick={() => setShowSidebar((prev) => !prev)}
            >
              ☰
            </span>

            <h1>AI Event Concierge</h1>
          </div>

          <div className="profile">
            <span>Gaurav</span>
            <div className="avatar">G</div>
          </div>
        </div>

        {/* results */}
        <div className="results">
          {loading && <Loader />}

          {!loading && !selectedEvent && (
            <p className="empty-text">
              Start by describing your event or pick something from history.
            </p>
          )}

          {!loading && selectedEvent && (
            <EventCard event={selectedEvent} />
          )}
        </div>

        {/* input */}
        <div className="input-box">
          <EventForm onSubmit={handleSubmit} />
        </div>

      </main>
    </div>
  );
};

export default Home;