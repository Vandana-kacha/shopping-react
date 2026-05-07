import { useState } from "react";

const products = [
  { id: 1, name: "Phone", price: 200 },
  { id: 2, name: "Laptop", price: 800 },
  { id: 3, name: "Headphones", price: 50 },
];

export default function Shop() {
  const [cart, setCart] = useState([]);

  // ADD with quantity logic
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.id === product.id);

        if (existing) {
            return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, qty: item.qty + 1 }
                : item
            );
        } else {
            return [...prevCart, { ...product, qty: 1 }];
        }
        });
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // REMOVE item completely
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

   const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
   );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Shop 🛒
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PRODUCTS */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Products</h2>

          {products.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border-b py-3"
            >
              <span>
                {p.name} - ${p.price}
              </span>

              <button
                onClick={() => addToCart(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Cart</h2>

          {cart.length === 0 && (
            <p className="text-gray-500">Cart is empty</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3"
            >
              <span>
                {item.name} × {item.qty}
              </span>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="mt-4 pt-3 border-0 text-right font-semibold">
        Total: ${total}
      </div>
        </div>
      </div>
    </div>
    
  );
}