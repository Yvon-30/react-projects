import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
  const tracks = [
    {
      title: "Au pied de ta croix",
      artist: "Anna Teko",
      url: "/music/anna_teko_au_pied_de_ta_croix.mp3",
    },
    {
      title: "C'est Dieu qui a commencé",
      artist: "KS Bloom",
      url: "/music/ks_bloom_c_est_dieu_qui_a_commence.mp3",
    },
    {
      title: "Dansaki",
      artist: "Lara George",
      url: "/music/lara_george_dansaki.mp3",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // 🔁 Met à jour la barre de progression
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentIndex]);

  // 🎧 Démarre ou met en pause
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        console.log("Lecture de :", tracks[currentIndex].url);
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Erreur lors de la lecture :", error);
    }
  };

  // ⏭️ Chanson suivante
  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    setProgress(0);
  };

  // ⏮️ Chanson précédente
  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
    setProgress(0);
  };

  // 🔁 Relance la lecture automatiquement quand on change de piste
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((err) => console.error("Erreur lors du changement :", err));
    }
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">🎵 Music Player</h1>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/30 w-full text-center">
          <h2 className="text-xl font-semibold mb-4">{tracks[currentIndex].title}</h2>

          <audio ref={audioRef} preload="auto">
            <source src={tracks[currentIndex].url} type="audio/mpeg" />
            Votre navigateur ne supporte pas l’audio.
          </audio>

          <div className="w-full h-2 bg-gray-300 rounded-full mb-4">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Boutons de navigation */}
          <div className="flex justify-center gap-4">
            <button
              onClick={prevTrack}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              ⏮️
            </button>
            <button
              onClick={togglePlay}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button
              onClick={nextTrack}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              ⏭️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
