import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { closeCartSidebar, openCartSidebar } from '../../store/features/ui/uiSlice';
import { removeFromCart, updateQuantity, clearCart } from '../../store/features/cart/cartSlice';
import { formatPrice } from '../../utils/helpers';

const CartSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartSidebarOpen } = useAppSelector(state => state.ui);
  const { items, total, itemCount } = useAppSelector(state => state.cart);

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && cartSidebarOpen) {
        dispatch(closeCartSidebar());
      }
    };

    if (cartSidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      // Scroll'u engelle
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [cartSidebarOpen, dispatch]);

  const handleGoToCart = () => {
    dispatch(closeCartSidebar());
    navigate('/sepet');
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {/* Overlay */}
      {cartSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 touch-manipulation"
          onClick={() => dispatch(closeCartSidebar())}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        cartSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-800">
              Sepetim ({itemCount} ürün)
            </h2>
            <button
              onClick={() => dispatch(closeCartSidebar())}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors active:bg-gray-300 touch-manipulation"
              aria-label="Sepeti kapat"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🛒</span>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Sepetiniz boş</h3>
                <p className="text-gray-500">Alışverişe başlamak için ürün ekleyin</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
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
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {formatPrice(item.price)}/{item.unit}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, Math.max(0.5, item.quantity - 0.5))}
                              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              <span className="text-sm font-medium">-</span>
                            </button>
                            <span className="text-sm font-semibold text-gray-800 min-w-[30px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 0.5)}
                              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              <span className="text-sm font-medium">+</span>
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 hover:text-red-700 transition-colors"
                          >
                            <span className="text-xs">🗑️</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        <p className="font-bold text-red-600 text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-800">Toplam:</span>
                <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleGoToCart}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Sepete Git
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-xl border border-gray-300 transition-colors"
                >
                  Sepeti Temizle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
