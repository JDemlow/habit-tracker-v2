import { Link } from "react-router-dom";

const HomeCard = ({ id, title, description, onDelete }) => {
  return (
    <div className="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title || "Untitled Habit"}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description || "No description available."}
      </p>
      <Link
        to={`/HabitPage/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
      >
        Go to Habit
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
      <button
        onClick={() => onDelete(id)}
        className="px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default HomeCard;
