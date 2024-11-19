import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import HomeCard from "../components/HomeCard";

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/habits`);
        if (!response.ok) {
          throw new Error(`Failed to fetch habits. Status: ${response.status}`);
        }
        const data = await response.json();
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error.message);
      }
    };

    fetchHabits();
  }, [BACKEND_URL]);

  const handleAddHabit = async (newHabit) => {
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

  const handleDeleteHabit = async (id) => {
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
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 mb-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Add New Habit
      </button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <HomeCard
            key={habit._id}
            id={habit._id}
            title={habit.title}
            description={habit.description}
            onDelete={handleDeleteHabit} // Pass delete handler
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddHabit}
      />
    </div>
  );
};

export default HomePage;
