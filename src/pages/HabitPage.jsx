import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const HabitPage = () => {
  const { id } = useParams(); // Get the habit ID from the URL
  const [habit, setHabit] = useState(null);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/habits/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch habit. Status: ${response.status}`);
        }
        const data = await response.json();
        setHabit(data); // Set the fetched habit data
      } catch (error) {
        console.error("Error fetching habit:", error.message);
      }
    };

    fetchHabit();
  }, [BACKEND_URL, id]);

  if (!habit) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading habit details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">{habit.title}</h1>
      <p className="text-lg text-gray-600">{habit.description}</p>
    </div>
  );
};

export default HabitPage;
