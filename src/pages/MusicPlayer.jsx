import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
  const tracks = [
    { id: 1, title: "Anna Teko - Au pied de ta croix", url: "/music/Anna Teko - Au pied de ta croix.mp3" },
    { id: 2, title: "KS Bloom - C’est Dieu (qui a commencé)", url: "/music/KS_Bloom_-_C’est_Dieu_(_qui_a_commencé).mp3" },
    { id: 3, title: "Song 3LARA GEORGE DANSAKI", url: "/music/LARA GEORGE DANSAKI.mp3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">🎵 Music Player</h1>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/30 w-full text-center">
          <h2 className="text-xl font-semibold mb-4">{tracks[currentIndex].title}</h2>

          <audio
            ref={audioRef}
            src={tracks[currentIndex].url}
            onEnded={nextTrack}
          />

          {/* Barre de progression */}
          <div className="w-full h-2 bg-gray-300 rounded-full mb-4">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Contrôles */}
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
