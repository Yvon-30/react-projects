import { useState } from "react";
import { Link } from "react-router-dom";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "7245f2aaae2ea9e79cf87e1e8bbf26fc"; // My API key

  const getWeather = async () => {
    if (!city) {
      setError("Veuillez entrer une ville");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fr`
      );

      if (!response.ok) throw new Error("Ville non trouvée");

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-md border border-white/30 p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">🌤️ Weather App</h1>
        <p className="text-gray-600 mb-6">Recherchez la météo d'une ville</p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Entrez une ville..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={getWeather}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            OK
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {weather && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{weather.name}</h2>
            <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
            <img
              alt="icon météo"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              className="mx-auto"
            />
          </div>
        )}

        <Link
          to="/"
          className="block mt-6 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
