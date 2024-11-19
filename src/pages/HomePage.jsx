import { useState, useEffect } from "react";
import HomeCard from "../components/HomeCard";

const HomePage = () => {
  const [habits, setHabits] = useState([]);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        console.log("Fetching habits from:", `${BACKEND_URL}/habits`);
        const response = await fetch(`${BACKEND_URL}/habits`);
        if (!response.ok) {
          throw new Error(`Failed to fetch habits. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched habits:", data);
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error.message);
      }
    };

    fetchHabits();
  }, [BACKEND_URL]);

  const addHabit = async () => {
    const newHabit = {
      title: "New Habit",
      description: "This is a new habit description",
    };

    try {
      const response = await fetch(`${BACKEND_URL}/habits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHabit),
      });

      if (!response.ok) {
        throw new Error(`Failed to add habit. Status: ${response.status}`);
      }

      const addedHabit = await response.json();
      setHabits((prevHabits) => [...prevHabits, addedHabit]);
    } catch (error) {
      console.error("Error adding habit:", error.message);
    }
  };

  const deleteHabit = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/habits/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete habit. Status: ${response.status}`);
      }

      setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Habit Tracker</h1>
      <button
        onClick={addHabit}
        className="px-4 py-2 mb-4 text-white bg-green-500 rounded-md"
      >
        Add Habit
      </button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <HomeCard
            key={habit._id}
            id={habit._id}
            title={habit.title}
            description={habit.description}
            onDelete={deleteHabit}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
