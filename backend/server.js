import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import habitsRouter from "./routes/habits.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/habits", habitsRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
