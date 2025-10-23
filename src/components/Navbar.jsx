import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//import logo from "../assets/logo.svg";
import useTheme from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-white/40 backdrop-blur-md shadow-sm py-4 sticky top-0 z-50 border-b border-white/30">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 tracking-wide">
        Mes Projets React
      </h1>
    </nav>
  );
}
