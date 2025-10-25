import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';

const CartItem = ({ item }) => {
    const { updateCartQuantity, removeFromCart } = useApp();
  
    return (
      <div className="card bg-white shadow-lg mb-4">
        <div className="card-body p-4">
          <div className="flex gap-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm">{formatPrice(item.price)}/{item.unit}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateCartQuantity(item.id, -0.5)} className="btn btn-sm btn-circle">
                  <span>-</span>
                </button>
                <span className="font-bold min-w-[60px] text-center">{item.quantity} {item.unit}</span>
                <button onClick={() => updateCartQuantity(item.id, 0.5)} className="btn btn-sm btn-circle">
                  <span>+</span>
                </button>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-error btn-circle ml-auto">
                  <span>🗑️</span>
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CartItem;