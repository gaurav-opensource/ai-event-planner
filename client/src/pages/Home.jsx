import React, { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import SearchHistory from "../components/SearchHistory";
import Loader from "../components/Loader";
import { createEvent, getEvents } from "../services/api";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // ✅ NEW

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (prompt) => {
    try {
      setLoading(true);
      const res = await createEvent({ prompt });

      // Add new event at top
      setEvents((prev) => [res.data, ...prev]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      {/* Sidebar */}
      <div className={`sidebar ${!showSidebar ? "hidden" : ""}`}>
        <h2 className="sidebar-title">History</h2>
        <SearchHistory events={events} />
      </div>

      {/* Main Section */}
      <div className="main">

        {/* Header */}
        <div className="header">

          {/* Left side (menu + title) */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              className="menu-btn"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              ☰
            </span>

            <h1>AI Event Concierge</h1>
          </div>

          {/* Right side (profile) */}
          <div className="profile">
            <span>Gaurav</span>
            <div className="avatar"></div>
          </div>
        </div>

        {/* Results */}
        <div className="results">
          {loading && <Loader />}

          {!loading && events.length === 0 && (
            <p className="empty-text">
              Start by describing your event...
            </p>
          )}

          {!loading &&
            events.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
        </div>

        {/* Input */}
        <div className="input-box">
          <EventForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Home;