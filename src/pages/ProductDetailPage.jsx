import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/features/cart/cartSlice';
import { openCartSidebar } from '../store/features/ui/uiSlice';
import { formatPrice } from '../utils/helpers';

const ProductDetailPage = () => {
    const { selectedProduct, setCurrentPage } = useApp();
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [customQuantity, setCustomQuantity] = useState('');
  
    if (!selectedProduct) {
      navigate('/urunler');
      return null;
    }
  
    const handleAddToCart = () => {
      dispatch(addToCart({ product: selectedProduct, quantity }));
      dispatch(openCartSidebar());
      setQuantity(1);
      setCustomQuantity('');
    };

    const handleQuantityChange = (value) => {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0.5) {
        setQuantity(numValue);
        setCustomQuantity(value);
      }
    };

    const handleCustomQuantitySubmit = () => {
      const numValue = parseFloat(customQuantity);
      if (!isNaN(numValue) && numValue >= 0.5) {
        setQuantity(numValue);
      } else {
        setCustomQuantity(quantity.toString());
      }
    };
  
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          {/* Breadcrumb */}
              <div className="mb-6">
                <button
                  onClick={() => navigate('/urunler')}
                  className="btn btn-ghost text-gray-600 hover:text-red-600 transition-colors"
                >
                  ← Ürünlere Dön
                </button>
              </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-6">
                <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                
                {/* Stock Status */}
                <div className="mt-4 flex items-center justify-center">
                  <div className={`badge badge-lg px-4 py-2 ${
                    selectedProduct.stock > 20 ? 'badge-success' : 
                    selectedProduct.stock > 0 ? 'badge-warning' : 'badge-error'
                  }`}>
                    {selectedProduct.stock > 0 ? 
                      `${selectedProduct.stock} ${selectedProduct.unit} stokta` : 
                      'Stokta yok'
                    }
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                {/* Product Title & Category */}
                <div className="mb-6">
                  <div className="badge badge-secondary badge-lg mb-4">
                    {selectedProduct.category}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
                
                {/* Price */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl mb-8">
                  <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-2">
                    {formatPrice(selectedProduct.price)}/{selectedProduct.unit}
                  </div>
                  <p className="text-gray-600">Birim fiyat</p>
                </div>
    
                {/* Quantity Selection */}
                <div className="mb-8">
                  <label className="label">
                    <span className="label-text text-xl font-semibold text-gray-800">
                      Miktar Seçin ({selectedProduct.unit})
                    </span>
                  </label>
                  
                  {/* Quick Quantity Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[0.5, 1, 2, 5].map(amount => (
                      <button
                        key={amount}
                        onClick={() => {
                          setQuantity(amount);
                          setCustomQuantity('');
                        }}
                        className={`btn ${quantity === amount ? 'btn-primary' : 'btn-outline'} btn-lg`}
                      >
                        {amount} {selectedProduct.unit}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Quantity Input */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={customQuantity}
                        onChange={(e) => setCustomQuantity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCustomQuantitySubmit()}
                        placeholder={`Özel miktar (min: 0.5 ${selectedProduct.unit})`}
                        step="0.5"
                        min="0.5"
                        className="input input-bordered w-full text-lg"
                      />
                    </div>
                    <button 
                      onClick={handleCustomQuantitySubmit}
                      className="btn btn-primary btn-lg px-6"
                    >
                      ✓
                    </button>
                  </div>
                  
                  {/* Manual Quantity Controls */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button 
                      onClick={() => {
                        const newQty = Math.max(0.5, quantity - 0.5);
                        setQuantity(newQty);
                        setCustomQuantity('');
                      }}
                      className="btn btn-circle btn-lg btn-outline"
                    >
                      <span className="text-2xl">-</span>
                    </button>
                    
                    <div className="bg-gray-100 px-6 py-3 rounded-xl min-w-[120px] text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {quantity} {selectedProduct.unit}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        const newQty = quantity + 0.5;
                        setQuantity(newQty);
                        setCustomQuantity('');
                      }}
                      className="btn btn-circle btn-lg btn-outline"
                    >
                      <span className="text-2xl">+</span>
                    </button>
                  </div>
                  
                  {/* Total Price Display */}
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      Toplam: {formatPrice(selectedProduct.price * quantity)}
                    </div>
                  </div>
                </div>
    
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-lg w-full text-xl py-4 disabled:opacity-50"
                  disabled={selectedProduct.stock === 0}
                >
                  {selectedProduct.stock === 0 ? 
                    'Stokta Yok' : 
                    `🛒 Sepete Ekle (${formatPrice(selectedProduct.price * quantity)})`
                  }
                </button>
                
                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Taze ve kaliteli</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Hızlı teslimat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Güvenli ödeme</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Müşteri memnuniyeti</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ProductDetailPage;