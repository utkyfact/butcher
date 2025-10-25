import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/Products/ProductCard';

const ProductsPage = () => {
    const { products } = useApp();
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
  
    const filteredProducts = products.filter(p => {
      const matchesCategory = selectedCategory === 'Tümü' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  
    return (
      <div className="bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 -mt-4">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">🥩 Ürünlerimiz</h1>
              <p className="text-xl text-red-100">Taze ve kaliteli et ürünlerimizi keşfedin</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Category Filter */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Kategori</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {['Tümü', 'Dana', 'Kuzu', 'Tavuk'].map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Arama</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
                </div>
              </div>

              {/* Sort */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Sıralama</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="name">İsme Göre</option>
                  <option value="price-low">Fiyat (Düşük → Yüksek)</option>
                  <option value="price-high">Fiyat (Yüksek → Düşük)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <p className="text-gray-600">
                <span className="font-semibold text-red-600">{sortedProducts.length}</span> ürün bulundu
              </p>
              {selectedCategory !== 'Tümü' && (
                <span className="badge badge-primary">
                  {selectedCategory}
                </span>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2">
              <Link to="/" className="btn btn-outline btn-sm">
                ← Ana Sayfa
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12">
                <span className="text-8xl mb-6 block">🔍</span>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h3>
                <p className="text-gray-600 mb-6">
                  Aradığınız kriterlere uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSelectedCategory('Tümü');
                      setSearchTerm('');
                    }}
                    className="btn btn-primary"
                  >
                    Filtreleri Temizle
                  </button>
                  <Link to="/" className="btn btn-outline">
                    Ana Sayfaya Dön
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default ProductsPage;