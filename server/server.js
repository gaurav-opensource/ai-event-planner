


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
connectDB();




const app = express();

app.use(cors({
  origin: "https://ai-event-planner-tawny.vercel.app", // your Vite frontend
  credentials: true
}));



app.use(express.json());

app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});