import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ORDER_STATUS_LABELS } from '../utils/constants';
import { formatPrice, formatDate } from '../utils/helpers';

const AdminPage = () => {
    const { orders, products, updateOrderStatus, updateProductStock } = useApp();
    const [activeTab, setActiveTab] = useState('orders');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
  
    const AdminOrders = () => {
      const filteredOrders = orders.filter(order => {
        const matchesSearch = order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.id.toString().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
      });

      return (
        <div>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Sipariş ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Beklemede</option>
                <option value="preparing">Hazırlanıyor</option>
                <option value="ready">Hazır</option>
                <option value="completed">Tamamlandı</option>
                <option value="cancelled">İptal</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Sipariş</th>
                    <th className="px-6 py-4 text-left font-semibold">Müşteri</th>
                    <th className="px-6 py-4 text-left font-semibold">Tarih</th>
                    <th className="px-6 py-4 text-left font-semibold">Ürünler</th>
                    <th className="px-6 py-4 text-left font-semibold">Toplam</th>
                    <th className="px-6 py-4 text-left font-semibold">Durum</th>
                    <th className="px-6 py-4 text-left font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-lg">#{order.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{order.userId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">{formatDate(order.createdAt)}</div>
                        <div className="text-xs text-gray-500">Teslim: {order.date} {order.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {order.items.map(item => (
                            <div key={item.id} className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {item.name} ({item.quantity}{item.unit})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-red-600 text-lg">{formatPrice(order.total)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        >
                          <option value="pending">⏳ Beklemede</option>
                          <option value="preparing">👨‍🍳 Hazırlanıyor</option>
                          <option value="ready">✅ Hazır</option>
                          <option value="completed">🎉 Tamamlandı</option>
                          <option value="cancelled">❌ İptal</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {order.notes && (
                          <button 
                            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            onClick={() => alert(`Müşteri Notu:\n${order.notes}`)}
                          >
                            📝 Not
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
  
    const AdminProducts = () => (
      <div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Görsel</th>
                  <th className="px-6 py-4 text-left font-semibold">Ürün</th>
                  <th className="px-6 py-4 text-left font-semibold">Kategori</th>
                  <th className="px-6 py-4 text-left font-semibold">Fiyat</th>
                  <th className="px-6 py-4 text-left font-semibold">Stok</th>
                  <th className="px-6 py-4 text-left font-semibold">Yönetim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-lg">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-red-600 text-lg">{formatPrice(product.price)}/{product.unit}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 20 ? 'bg-green-100 text-green-700' : 
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {product.stock} {product.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateProductStock(product.id, Math.max(0, product.stock - 10))}
                          className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) => updateProductStock(product.id, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => updateProductStock(product.id, product.stock + 10)}
                          className="w-8 h-8 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  
    const AdminStats = () => {
      const pendingOrders = orders.filter(o => o.status === 'pending').length;
      const preparingOrders = orders.filter(o => o.status === 'preparing').length;
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
      const lowStockProducts = products.filter(p => p.stock < 20);
      const outOfStockProducts = products.filter(p => p.stock === 0);
  
      return (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                  <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hazırlanıyor</p>
                  <p className="text-3xl font-bold text-orange-600">{preparingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Ciro</p>
                  <p className="text-3xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Stok Uyarıları</h3>
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">✅</span>
                <p className="text-gray-600 text-lg">Tüm ürünler yeterli stoğa sahip!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lowStockProducts.map(product => (
                  <div key={product.id} className={`p-4 rounded-lg border-l-4 ${
                    product.stock === 0 ? 'bg-red-50 border-red-400' : 'bg-yellow-50 border-yellow-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">
                          Stok: {product.stock} {product.unit}
                          {product.stock === 0 ? ' - Stokta yok!' : ' - Tedarik gerekli!'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {product.stock === 0 ? '❌' : '⚠️'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };
  
    return (
      <div className="bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8 -mt-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">🛠️ Admin Paneli</h1>
                <p className="text-red-100">Sipariş ve ürün yönetimi</p>
              </div>
              <Link to="/" className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-red-600">
                ← Ana Sayfa
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📦 Siparişler ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'products' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📊 Ürünler ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'stats' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📈 İstatistikler
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'stats' && <AdminStats />}
          </div>
        </div>
      </div>
    );
  };

export default AdminPage;