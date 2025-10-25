import React, { createContext, useContext, useState } from 'react';
import { authService, firestoreService } from '../firebase';
import { mockProducts } from '../utils/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState([]);

  const login = async (email, password, name) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setCart([]);
    setCurrentPage('home');
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateCartQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(0.5, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const createOrder = async (orderData) => {
    const newOrder = await firestoreService.createOrder({
      userId: currentUser.email,
      items: cart,
      total: orderData.total || getTotalPrice(),
      ...orderData,
      status: 'pending'
    });
    setOrders([...orders, newOrder]);
    setCart([]);
    setCurrentPage('orders');
    alert('✅ Siparişiniz başarıyla alındı!');
  };

  const updateProductStock = (productId, newStock) => {
    setProducts(products.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const value = {
    currentPage, setCurrentPage,
    selectedProduct, setSelectedProduct,
    cart, setCart, currentUser, products, orders,
    login, logout, addToCart, updateCartQuantity,
    removeFromCart, getTotalPrice, createOrder,
    updateProductStock, updateOrderStatus
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};