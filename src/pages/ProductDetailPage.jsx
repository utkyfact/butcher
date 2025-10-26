import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/features/cart/cartSlice';
import { openCartSidebar } from '../store/features/ui/uiSlice';
import { formatPrice } from '../utils/helpers';

const ProductDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { products, setSelectedProduct } = useApp();
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [customQuantity, setCustomQuantity] = useState('');
    
    const selectedProduct = products.find(p => p.id === Number(id) || p.id.toString() === id);
  
    useEffect(() => {
      if (selectedProduct) {
        setSelectedProduct(selectedProduct);
      }
    }, [id, products, setSelectedProduct, selectedProduct]);
  
    if (!selectedProduct) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h2>
            <button onClick={() => navigate('/urunler')} className="btn btn-primary">
              Ürünlere Dön
            </button>
          </div>
        </div>
      );
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
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb */}
              <div className="mb-4 sm:mb-6">
                <button
                  onClick={() => navigate('/urunler')}
                  className="btn btn-ghost btn-sm sm:btn-md text-gray-600 hover:text-red-600 transition-colors text-xs sm:text-sm lg:text-base"
                >
                  ← Ürünlere Dön
                </button>
              </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Product Image */}
            <div className="order-1">
              <div className="lg:sticky lg:top-6">
                <div className="aspect-square lg:aspect-[4/3] rounded-xl lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-2xl bg-white">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                
                {/* Stock Status */}
                <div className="mt-3 lg:mt-4 flex items-center justify-center">
                  <div className={`badge badge-sm lg:badge-lg px-3 lg:px-4 py-1.5 lg:py-2 ${
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
            <div className="order-2">
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-4 sm:p-6 lg:p-8">
                {/* Product Title & Category */}
                <div className="mb-4 lg:mb-6">
                  <div className="badge badge-secondary badge-sm lg:badge-lg mb-3 lg:mb-4">
                    {selectedProduct.category}
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
                
                {/* Price */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-6 rounded-lg lg:rounded-xl mb-6 lg:mb-8">
                  <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-red-600 mb-1 lg:mb-2">
                    {formatPrice(selectedProduct.price)}/{selectedProduct.unit}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">Birim fiyat</p>
                </div>
    
                {/* Quantity Selection */}
                <div className="mb-6 lg:mb-8">
                  <label className="label px-0">
                    <span className="label-text text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
                      Miktar Seçin ({selectedProduct.unit})
                    </span>
                  </label>
                  
                  {/* Quick Quantity Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {[0.5, 1, 2, 5].map(amount => (
                      <button
                        key={amount}
                        onClick={() => {
                          setQuantity(amount);
                          setCustomQuantity('');
                        }}
                        className={`btn ${quantity === amount ? 'btn-primary' : 'btn-outline'} btn-sm sm:btn-md lg:btn-lg text-xs sm:text-sm`}
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
                        className="input input-bordered w-full text-sm sm:text-base lg:text-lg"
                      />
                    </div>
                    <button 
                      onClick={handleCustomQuantitySubmit}
                      className="btn btn-primary btn-sm sm:btn-md lg:btn-lg px-3 sm:px-4 lg:px-6"
                    >
                      ✓
                    </button>
                  </div>
                  
                  {/* Manual Quantity Controls */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
                    <button 
                      onClick={() => {
                        const newQty = Math.max(0.5, quantity - 0.5);
                        setQuantity(newQty);
                        setCustomQuantity('');
                      }}
                      className="btn btn-circle btn-sm sm:btn-md lg:btn-lg btn-outline"
                    >
                      <span className="text-lg sm:text-xl lg:text-2xl">-</span>
                    </button>
                    
                    <div className="bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl min-w-[100px] sm:min-w-[120px] text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                        {quantity} {selectedProduct.unit}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        const newQty = quantity + 0.5;
                        setQuantity(newQty);
                        setCustomQuantity('');
                      }}
                      className="btn btn-circle btn-sm sm:btn-md lg:btn-lg btn-outline"
                    >
                      <span className="text-lg sm:text-xl lg:text-2xl">+</span>
                    </button>
                  </div>
                  
                  {/* Total Price Display */}
                  <div className="mt-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-red-600">
                      Toplam: {formatPrice(selectedProduct.price * quantity)}
                    </div>
                  </div>
                </div>
    
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-md sm:btn-lg w-full text-base sm:text-lg lg:text-xl py-3 sm:py-4 disabled:opacity-50"
                  disabled={selectedProduct.stock === 0}
                >
                  {selectedProduct.stock === 0 ? 
                    'Stokta Yok' : 
                    `🛒 Sepete Ekle (${formatPrice(selectedProduct.price * quantity)})`
                  }
                </button>
                
                {/* Additional Info */}
                <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
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