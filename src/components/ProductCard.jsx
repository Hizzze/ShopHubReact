import { Link } from 'react-router-dom';
import { getProducts } from '../data/products';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-content" style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} />
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary">View Details</Link>
          <button className="btn btn-primary">Add to Card</button>
        </div>
      </div>
    </div>
  );
}
