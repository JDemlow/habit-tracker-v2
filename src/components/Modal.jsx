import { useState } from "react";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", description: "" }); // Reset form after submission
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Create New Habit</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            ×
          </button>
        </div>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter habit title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter habit description"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
