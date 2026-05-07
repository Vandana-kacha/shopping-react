import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find((c) => c.id === product.id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === product.id
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((c) =>
        c.id === id ? { ...c, qty: c.qty + 1 } : c
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((c) =>
          c.id === id ? { ...c, qty: c.qty - 1 } : c
        )
        .filter((c) => c.qty > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);