import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import CounterApp from "./pages/CounterApp";
import TodoApp from "./pages/TodoApp";
import WeatherApp from "./pages/WeatherApp";


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterApp />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/weather" element={<WeatherApp />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    )
}

export default App
