import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const projects = [
    {
      title: "Counter App",
      emoji: "🔢",
      description: "Un compteur interactif simple.",
      link: "/counter",
    },
    {
      title: "Todo App",
      emoji: "📝",
      description: "Une liste de tâches avec ajout et suppression.",
      link: "/todo",
    },
    {
      title: "Weather App",
      emoji: "🌤️",
      description: "Une application météo simple et claire.",
      link: "/weather",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      {/* Navbar */}
      {/*<header className="bg-white/40 backdrop-blur-md shadow-sm py-4 sticky top-0 z-50 border-b border-white/30">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 tracking-wide">
          🚀 Mes Projets React
        </h1>
      </header>*/}

      {/* Section d’accueil */}
      <section className="text-center mt-10 mb-8 px-4">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-3 text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bienvenue 👋
        </motion.h2>
        <motion.p
          className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Voici mon espace d’apprentissage React.<br />
          Chaque carte ci-dessous représente un mini-projet que j’ai réalisé pour m’exercer et progresser.
        </motion.p>
      </section>

      {/* Grille des projets */}
      <main className="flex-1 grid gap-6 px-6 pb-10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-2 border border-white/30 flex flex-col justify-between h-52 sm:h-56"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div>
              <div className="text-4xl mb-3">{project.emoji}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-800">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-snug">
                {project.description}
              </p>
            </div>
            <Link
              to={project.link}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-indigo-700 transition self-start"
            >
              Voir le projet →
            </Link>
          </motion.div>
        ))}
      </main>

    </div>
  );
}
