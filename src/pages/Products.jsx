import { useState } from "react";

export default function Products() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "T-shirt React", price: 20, emoji: "👕" },
    { id: 2, name: "Casquette JS", price: 15, emoji: "🧢" },
    { id: 3, name: "Mug Dev", price: 10, emoji: "☕" },
    { id: 4, name: "Sac à dos", price: 35, emoji: "🎒" },
    { id: 5, name: "Clé USB", price: 8, emoji: "💾" },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🛒 E-commerce Shop
        </h1>

        {/* Panier */}
        <div className="text-right mb-4">
          <span className="font-semibold text-gray-700">
            Panier : {cart.length} {cart.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 shadow-md hover:shadow-xl border border-white/30 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-3">{product.emoji}</div>
                <h3 className="text-lg font-semibold mb-1 text-indigo-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2">Prix : ${product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition self-start"
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
