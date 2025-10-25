import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/features/cart/cartSlice';
import { openCartSidebar } from '../../store/features/ui/uiSlice';
import { formatPrice } from '../../utils/helpers';

const ProductCard = ({ product }) => {
    const dispatch = useAppDispatch();
  
    return (
      <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <figure className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between items-start">
            <h2 className="card-title text-lg">{product.name}</h2>
            <div className="badge badge-secondary">{product.category}</div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}/{product.unit}</span>
            <span className={`badge ${product.stock > 20 ? 'badge-success' : product.stock > 0 ? 'badge-warning' : 'badge-error'}`}>
              {product.stock} {product.unit}
            </span>
          </div>
          <div className="card-actions justify-end mt-4 gap-2">
            <Link to={`/urun/${product.id}`} className="btn btn-outline btn-sm flex-1">
              Detay
            </Link>
            <button 
              onClick={() => {
                dispatch(addToCart({ product, quantity: 1 }));
                dispatch(openCartSidebar());
              }} 
              className="btn btn-primary btn-sm flex-1"
              disabled={product.stock === 0}
            >
              🛒 Sepet
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ProductCard;