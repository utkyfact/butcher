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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Sipariş ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-sm">Sipariş</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm">Müşteri</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm">Tarih</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm">Ürünler</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm">Toplam</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm">Durum</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-base">#{order.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-sm">{order.userId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">{formatDate(order.createdAt)}</div>
                        <div className="text-xs text-gray-500">Teslim: {order.date} {order.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {order.items.map(item => (
                            <div key={item.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {item.name} ({item.quantity}{item.unit})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-red-600 text-base">{formatPrice(order.total)}</div>
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

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg text-gray-900">#{order.id}</div>
                    <div className="text-sm text-gray-600 mt-1">{order.userId}</div>
                  </div>
                  <div className="font-bold text-red-600 text-lg">{formatPrice(order.total)}</div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="text-xs text-gray-500">
                    Oluşturulma: {formatDate(order.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Teslim: {order.date} {order.time}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-700 mb-1">Ürünler:</div>
                  <div className="flex flex-wrap gap-1">
                    {order.items.map(item => (
                      <div key={item.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {item.name} ({item.quantity}{item.unit})
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="pending">⏳ Beklemede</option>
                    <option value="preparing">👨‍🍳 Hazırlanıyor</option>
                    <option value="ready">✅ Hazır</option>
                    <option value="completed">🎉 Tamamlandı</option>
                    <option value="cancelled">❌ İptal</option>
                  </select>
                  {order.notes && (
                    <button 
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm sm:w-auto w-full"
                      onClick={() => alert(`Müşteri Notu:\n${order.notes}`)}
                    >
                      📝 Not
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
  
    const AdminProducts = () => (
      <div>
        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-sm">Görsel</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">Ürün</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">Kategori</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">Fiyat</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">Stok</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm">Yönetim</th>
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
                      <div className="font-bold text-base">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-red-600 text-base">{formatPrice(product.price)}/{product.unit}</div>
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
                          className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center touch-manipulation"
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
                          className="w-8 h-8 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center touch-manipulation"
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

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {products.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex gap-4 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base text-gray-900 mb-1">{product.name}</div>
                  <div className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Fiyat</div>
                  <div className="font-bold text-red-600 text-sm">{formatPrice(product.price)}/{product.unit}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Stok</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 20 ? 'bg-green-100 text-green-700' : 
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {product.stock} {product.unit}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateProductStock(product.id, Math.max(0, product.stock - 10))}
                  className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium touch-manipulation"
                >
                  -10
                </button>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => updateProductStock(product.id, Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 px-2 py-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  onClick={() => updateProductStock(product.id, product.stock + 10)}
                  className="flex-1 px-3 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium touch-manipulation"
                >
                  +10
                </button>
              </div>
            </div>
          ))}
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
        <div className="space-y-6 sm:space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Toplam Sipariş</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Bekleyen</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{pendingOrders}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">⏳</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Hazırlanıyor</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">{preparingOrders}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">👨‍🍳</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Toplam Ciro</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">⚠️ Stok Uyarıları</h3>
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <span className="text-4xl sm:text-6xl mb-3 sm:mb-4 block">✅</span>
                <p className="text-gray-600 text-base sm:text-lg">Tüm ürünler yeterli stoğa sahip!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {lowStockProducts.map(product => (
                  <div key={product.id} className={`p-3 sm:p-4 rounded-lg border-l-4 ${
                    product.stock === 0 ? 'bg-red-50 border-red-400' : 'bg-yellow-50 border-yellow-400'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base text-gray-900">{product.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Stok: {product.stock} {product.unit}
                          {product.stock === 0 ? ' - Stokta yok!' : ' - Tedarik gerekli!'}
                        </p>
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${
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
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 sm:py-8 -mt-4">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">🛠️ Admin Paneli</h1>
                <p className="text-sm sm:text-base text-red-100">Sipariş ve ürün yönetimi</p>
              </div>
              <Link to="/" className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-red-600 w-full sm:w-auto">
                ← Ana Sayfa
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-2 mb-4 sm:mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base flex-1 sm:flex-none ${
                  activeTab === 'orders' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📦 Siparişler ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base flex-1 sm:flex-none ${
                  activeTab === 'products' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📊 Ürünler ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base flex-1 sm:flex-none ${
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
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6">
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'stats' && <AdminStats />}
          </div>
        </div>
      </div>
    );
  };

export default AdminPage;