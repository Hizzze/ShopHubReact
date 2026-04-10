import { createContext, useContext, useState } from 'react';

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(prodcutId) {
    const existing = cartItems.find((item) => item.id === prodcutId);

    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartItems.map((item) =>
        item.id == prodcutId ? { id: prodcutId, quantity: currentQuantity + 1 } : item,
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: prodcutId, quantity: 1 }]);
    }
  }

  return <CartContext.Provider value={{ cartItems, addToCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
