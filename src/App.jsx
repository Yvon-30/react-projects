import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import CounterApp from "./pages/CounterApp";
import TodoApp from "./pages/TodoApp";
import WeatherApp from "./pages/WeatherApp";
import Chat from "./pages/Chat";
import Products from "./pages/Products";
import MusicPlayer from "./pages/MusicPlayer";


function App() {

  return (
    <BrowserRouter basename="/react-projects">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterApp />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/products" element={<Products />} />
          <Route path="/music" element={<MusicPlayer />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    )
}

export default App
