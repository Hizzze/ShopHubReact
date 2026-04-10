import { Link } from 'react-router-dom';
import { getProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const productInCart = cartItems.find((item) => item.id === product.id);

  const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : '';
  return (
    <div className="product-card">
      <div className="product-card-content" style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} />
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
            Add to Card {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
