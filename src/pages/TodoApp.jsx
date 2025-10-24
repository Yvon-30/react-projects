import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Composant pour afficher une alerte temporaire
function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // disparaît après 2s
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg ${colors[type]} z-50`}
    >
      {message}
    </div>
  );
}

export default function Todo() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  // Sauvegarde dans localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Ajouter une tâche
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), title: newTask.trim(), completed: false };
    setTasks([task, ...tasks]); // tri automatique : la plus récente en haut
    setNewTask("");
    setToast({ message: "Tâche ajoutée !", type: "success" });
  };

  // Supprimer une tâche
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setToast({ message: "Tâche supprimée !", type: "error" });
  };

  // Modifier une tâche
  const editTask = (id) => {
    const newTitle = prompt("Modifier la tâche :");
    if (newTitle && newTitle.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle.trim() } : task
        )
      );
      setToast({ message: "Tâche modifiée !", type: "info" });
    }
  };

  // Compléter / décocher une tâche
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtrage
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-white/30 p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">📝 Todo App</h1>

        {/* Input + bouton */}
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

        {/* Filtres */}
        <div className="flex justify-center gap-2 mb-4 text-sm">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded-full transition ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f === "all" ? "Toutes" : f === "active" ? "Actives" : "Terminées"}
            </button>
          ))}
        </div>

        {/* Liste */}
        <ul className="text-left max-h-60 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune tâche pour le moment.</p>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-white/50 border border-white/30 rounded-lg px-3 py-2 mb-2"
              >
                <span
                  onClick={() => toggleComplete(task.id)}
                  className={`flex-1 cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editTask(task.id)}
                    className="text-blue-500 hover:text-blue-700 font-bold"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Retour accueil */}
        <Link
          to="/"
          className="inline-block mt-6 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition"
        >
          ← Retour à l’accueil
        </Link>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
