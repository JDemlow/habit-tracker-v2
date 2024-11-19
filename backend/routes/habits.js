import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Habit Schema and Model
const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Habit = mongoose.model("Habit", habitSchema);

// POST /habits - Add a new habit
router.post("/", async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    console.error("Error adding habit:", error);
    res.status(500).json({ message: "Error adding habit" });
  }
});

// GET /habits - Fetch all habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.status(200).json(habits);
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ message: "Error fetching habits" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Extract the habit ID from the request parameters
  try {
    const habit = await Habit.findByIdAndDelete(id); // Attempt to find and delete the habit
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" }); // Habit not found
    }
    res.status(200).json({ message: "Habit deleted successfully" }); // Success
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ message: "Error deleting habit" }); // Server error
  }
});

export default router;
