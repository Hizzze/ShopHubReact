import { createContext, useContext, useState } from 'react';
import { getProductById } from '../data/products';

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // {id: 2, quantity: 7}

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

  function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(prodcutId) {
    setCartItems(cartItems.filter((item) => item.id !== prodcutId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  }

  function getCartTotal() {
    const total = cartItems.reduce((totalValue, item) => {
      const prodcut = getProductById(item.id);
      return totalValue + (prodcut ? prodcut.price * item.quantity : 0);
    }, 0);

    return total;
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
