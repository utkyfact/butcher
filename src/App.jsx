import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/urunler" element={<ProductsPage />} />
          <Route path="/urun/:id" element={<ProductDetailPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/sepet" element={<CartPage />} />
          <Route path="/siparisler" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/giris" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </Router>
    </Provider>
  );
};

export default App;