import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-event-planner-backend.onrender.com/api",
});

export const createEvent = (data) => API.post("/events", data);
export const getEvents = () => API.get("/events");