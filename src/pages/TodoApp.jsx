import { useState } from "react";
import { Link } from "react-router-dom";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-white/30 p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">📝 Todo App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nouvelle tâche..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            +
          </button>
        </div>

        <ul className="text-left max-h-48 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune tâche pour le moment.</p>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white/50 border border-white/30 rounded-lg px-3 py-2 mb-2"
              >
                <span>{task}</span>
                <button
                  onClick={() => removeTask(index)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        <Link
          to="/"
          className="inline-block mt-6 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition"
        >
          ← Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
