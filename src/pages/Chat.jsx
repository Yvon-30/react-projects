import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll automatique vers le bas quand un nouveau message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, id: Date.now() }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          💬 Chat App
        </h1>

        {/* Zone des messages */}
        <div className="flex-1 bg-white/60 backdrop-blur-lg rounded-2xl p-4 overflow-y-auto mb-4 shadow-md border border-white/30">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center">Aucun message pour l'instant...</p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-indigo-100 text-gray-800 px-3 py-1 rounded-xl my-1 w-fit max-w-xs"
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone d’écriture */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Écrire un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded-2xl hover:bg-indigo-700 transition"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
