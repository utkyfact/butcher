import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import OrderCard from '../components/Orders/OrderCard';

const OrdersPage = () => {
    const { orders, currentUser } = useApp();
    const userOrders = orders.filter(o => o.userId === currentUser?.email);
  
    if (userOrders.length === 0) {
      return (
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <span className="mx-auto text-gray-300 mb-6 text-8xl">📦</span>
              <h2 className="text-3xl font-bold mb-4">Henüz Siparişiniz Yok</h2>
              <p className="text-gray-600 mb-8">İlk siparişinizi vermek için ürünlerimize göz atın</p>
              <Link to="/urunler" className="btn btn-primary btn-lg">
                Alışverişe Başla
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
            <h1 className="text-4xl font-bold">Siparişlerim ({userOrders.length})</h1>
            <Link to="/urunler" className="btn btn-outline">
              ← Alışverişe Devam Et
            </Link>
          </div>
          
          <div className="space-y-6">
            {userOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default OrdersPage;