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
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <span className="mx-auto text-gray-300 mb-6 text-8xl">🛒</span>
              <h2 className="text-3xl font-bold mb-4">Sepetiniz Boş</h2>
              <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünlerimize göz atın</p>
              <Link to="/urunler" className="btn btn-primary btn-lg">
                Ürünleri İncele
              </Link>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Sepetim ({itemCount} Ürün)</h1>
            <Link to="/urunler" className="btn btn-outline">
              ← Alışverişe Devam Et
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{formatPrice(item.price)}/{item.unit}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, Math.max(0.5, item.quantity - 0.5))}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <span className="text-sm font-medium">-</span>
                          </button>
                          <span className="text-lg font-semibold text-gray-800 min-w-[60px] text-center">
                            {item.quantity} {item.unit}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 0.5)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <span className="text-sm font-medium">+</span>
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 hover:text-red-700 transition-colors ml-auto"
                          >
                            <span className="text-xs">🗑️</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        <p className="font-bold text-red-600 text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div>
              <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Sipariş Özeti</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teslim Tarihi
                    </label>
                    <input
                      type="date"
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teslim Saati
                    </label>
                    <select
                      value={orderTime}
                      onChange={(e) => setOrderTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Saat Seçiniz</option>
                      {TIME_SLOTS.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sipariş Notu
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Özel istekleriniz..."
                      rows="3"
                    />
                  </div>
                </div>
  
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-2 text-lg">
                    <div className="flex justify-between">
                      <span>Ara Toplam:</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Teslimat:</span>
                      <span>Ücretsiz</span>
                    </div>
                  </div>
                </div>
  
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Toplam:</span>
                    <span className="text-red-600">{formatPrice(total)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
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