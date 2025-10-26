import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/features/cart/cartSlice';
import { TIME_SLOTS } from '../utils/constants';
import { formatPrice } from '../utils/helpers';

const CartPage = () => {
    const { currentUser, createOrder, setCart } = useApp();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { items, total, itemCount } = useAppSelector(state => state.cart);
    const [orderDate, setOrderDate] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const [orderNotes, setOrderNotes] = useState('');
  
    const handleCheckout = () => {
      if (!currentUser) {
        alert('Sipariş vermek için giriş yapmalısınız!');
        navigate('/giris');
        return;
      }
      if (!orderDate || !orderTime) {
        alert('Lütfen tarih ve saat seçiniz!');
        return;
      }
      
      // RTK cart'ı Context'e geçici olarak aktar
      const tempCart = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        image: item.image,
        category: item.category
      }));
      
      // Context'teki cart'ı güncelle
      setCart(tempCart);
      
      // Total'ı hesapla
      const calculatedTotal = tempCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      createOrder({ 
        date: orderDate, 
        time: orderTime, 
        notes: orderNotes,
        createdAt: new Date().toISOString(),
        total: calculatedTotal
      });
      dispatch(clearCart());
      navigate('/siparisler');
    };

    const handleRemoveItem = (id) => {
      dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, quantity) => {
      dispatch(updateQuantity({ id, quantity }));
    };
  
    if (items.length === 0) {
      return (
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16">
            <div className="text-center">
              <span className="mx-auto text-gray-300 mb-4 sm:mb-6 text-6xl sm:text-8xl block">🛒</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Sepetiniz Boş</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Alışverişe başlamak için ürünlerimize göz atın</p>
              <Link to="/urunler" className="btn btn-primary btn-md sm:btn-lg">
                Ürünleri İncele
              </Link>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Sepetim ({itemCount} Ürün)</h1>
            <Link to="/urunler" className="btn btn-outline btn-sm sm:btn-md w-full sm:w-auto">
              ← Alışverişe Devam Et
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-3 sm:space-y-4">
                {items.map(item => (
                  <div key={item.id} className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 flex items-start">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">{formatPrice(item.price)}/{item.unit}</p>
                          </div>
                          
                          {/* Price - Mobile */}
                          <div className="sm:hidden text-right">
                            <p className="font-bold text-red-600 text-lg">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 sm:gap-3 mt-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, Math.max(0.5, item.quantity - 0.5))}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors touch-manipulation"
                          >
                            <span className="text-sm font-medium">-</span>
                          </button>
                          <span className="text-base sm:text-lg font-semibold text-gray-800 min-w-[80px] sm:min-w-[60px] text-center">
                            {item.quantity} {item.unit}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 0.5)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors touch-manipulation"
                          >
                            <span className="text-sm font-medium">+</span>
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 hover:text-red-700 transition-colors ml-auto touch-manipulation"
                          >
                            <span className="text-xs sm:text-sm">🗑️</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Price - Desktop */}
                      <div className="hidden sm:flex flex-shrink-0 text-right items-start">
                        <p className="font-bold text-red-600 text-lg lg:text-xl">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div>
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Sipariş Özeti</h2>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Teslim Tarihi
                    </label>
                    <input
                      type="date"
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Teslim Saati
                    </label>
                    <select
                      value={orderTime}
                      onChange={(e) => setOrderTime(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Saat Seçiniz</option>
                      {TIME_SLOTS.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Sipariş Notu
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Özel istekleriniz..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-3 sm:mb-4">
                  <div className="space-y-2 text-base sm:text-lg">
                    <div className="flex justify-between">
                      <span>Ara Toplam:</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                      <span>Teslimat:</span>
                      <span>Ücretsiz</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-xl sm:text-2xl font-bold">
                    <span>Toplam:</span>
                    <span className="text-red-600">{formatPrice(total)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 sm:py-3.5 px-4 rounded-lg transition-colors text-sm sm:text-base touch-manipulation"
                >
                  Siparişi Tamamla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CartPage;