import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AuthPage = () => {
    const { login } = useApp();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');
      
      try {
        if (isLogin) {
          await login(email, password);
        } else {
          await login(email, password, name);
        }
        navigate('/');
      } catch (err) {
        setError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="text-6xl mb-4 hover:scale-110 transition-transform">🥩</div>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Kasabım</h1>
            <p className="text-gray-600">Taze ve kaliteli et ürünleri</p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Tab Headers */}
            <div className="flex">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  isLogin 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Giriş Yap
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  !isLogin 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Kayıt Ol
              </button>
            </div>

            {/* Form */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Tekrar Hoş Geldiniz!' : 'Hesap Oluşturun'}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? 'Hesabınıza giriş yapın' : 'Yeni bir hesap oluşturun'}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    {error}
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ahmet Yılmaz"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şifre
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  {isLoading ? '⏳ Yükleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
                </button>
              </form>

              {/* Demo Info */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">🔑 Demo Hesaplar:</p>
                  <div className="space-y-1">
                    <p><strong>Admin:</strong> admin@kasap.com</p>
                    <p><strong>Müşteri:</strong> Herhangi bir email</p>
                    <p className="text-xs text-blue-600 mt-2">Şifre: Herhangi bir şifre</p>
                  </div>
                </div>
              </div>

              {/* Back to Home */}
              <div className="text-center mt-6">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-red-600 transition-colors text-sm"
                >
                  ← Ana Sayfaya Dön
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AuthPage;