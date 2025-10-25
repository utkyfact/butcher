import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HeroSlider from '../components/Home/HeroSlider';
import ProductCard from '../components/Products/ProductCard';
import Features from '../components/Home/Features';

const HomePage = () => {
    const { products } = useApp();
  
  return (
    <div>
      <div className="-mt-4">
        <HeroSlider />
      </div>
      
      <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600 text-lg">Taze ve kaliteli et ürünlerimizi keşfedin</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
  
              <div className="text-center">
                <Link to="/urunler" className="btn btn-primary btn-lg">
                  Tüm Ürünleri Gör →
                </Link>
              </div>
  
          <div className="mt-16">
            <Features />
          </div>
        </div>
      </div>
    );
  };

export default HomePage;