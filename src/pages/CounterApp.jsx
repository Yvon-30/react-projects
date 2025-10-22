import { useState } from "react";
import { Link } from "react-router-dom";

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-white/30 p-8 w-80 text-center">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">🔢 Counter App</h1>
        <p className="text-gray-600 mb-6">Clique pour augmenter ou diminuer le compteur</p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            -
          </button>
          <span className="text-3xl font-bold">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
          >
            +
          </button>
        </div>

        <button
          onClick={() => setCount(0)}
          className="inline-block mt-6 bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-400 transition"
        >
          Réinitialiser
        </button>

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
