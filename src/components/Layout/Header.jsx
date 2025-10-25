import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { openCartSidebar } from '../../store/features/ui/uiSlice';

const Header = () => {
    const { currentUser, logout } = useApp();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { itemCount } = useAppSelector(state => state.cart);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
  
    const handleLogout = () => {
      logout();
      setShowMobileSidebar(false);
    };

    return (
      <>
        {/* Desktop Navbar */}
        {!isMobile && (
        <div className="navbar bg-red-700 text-white shadow-lg sticky top-0 z-50 flex">

          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl font-bold">
              🥩 Kasabım
            </Link>
          </div>

          <div className="navbar-center">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/" className="btn btn-ghost">Ana Sayfa</Link></li>
              <li><Link to="/urunler" className="btn btn-ghost">Ürünler</Link></li>
              <li><Link to="/hakkimizda" className="btn btn-ghost">Hakkımızda</Link></li>
            </ul>
          </div>
        
          <div className="navbar-end gap-2">
            <button onClick={() => dispatch(openCartSidebar())} className="btn btn-ghost btn-circle relative">
              🛒
              {itemCount > 0 && (
                <span className="badge badge-sm badge-warning absolute -top-1 -right-1">{itemCount}</span>
              )}
            </button>
            
            {currentUser ? (
              <div className="relative group">
                <button className="btn btn-ghost btn-circle">
                  👤
                </button>
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-[60] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">Merhaba, {currentUser.name}</p>
                  </div>
                  <ul className="py-2">
                    {currentUser.role === 'admin' && (
                      <li>
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="/siparisler" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Siparişlerim
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        🚪 Çıkış Yap
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/giris" className="btn btn-warning btn-sm">
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
        )}

        {/* Mobile Navbar */}
        {isMobile && (
        <div className="flex navbar bg-red-700 text-white shadow-lg sticky top-0 z-50 px-4">
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold">
              🥩 Kasabım
            </Link>
          </div>
          <div className="flex-none">
            <button 
              className="btn btn-ghost btn-circle" 
              onClick={() => setShowMobileSidebar(true)}
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobile && showMobileSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setShowMobileSidebar(false)}
          />
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[101] transform transition-transform duration-300 ${
          showMobileSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="bg-red-700 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Menü</h2>
              <button 
                onClick={() => setShowMobileSidebar(false)}
                className="btn btn-ghost btn-circle btn-sm text-white"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>

            {/* User Info */}
            {currentUser && (
              <div className="bg-red-50 p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{currentUser.name}</p>
                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col p-4 gap-2">
                {/* Cart */}
                <button
                  onClick={() => {
                    dispatch(openCartSidebar());
                    setShowMobileSidebar(false);
                  }}
                  className="flex items-center justify-between text-gray-700 hover:bg-red-50 rounded-lg p-3 w-full"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">🛒</span>
                    <span className="font-medium">Sepetim</span>
                  </span>
                  {itemCount > 0 && (
                    <span className="badge badge-warning">{itemCount}</span>
                  )}
                </button>

                {/* Divider */}
                <div className="divider my-2"></div>

                {/* Navigation Links */}
                <Link 
                  to="/" 
                  onClick={() => setShowMobileSidebar(false)}
                  className="flex items-center gap-3 text-gray-700 hover:bg-red-50 rounded-lg p-3 w-full"
                >
                  <span className="text-xl">🏠</span>
                  <span className="font-medium">Ana Sayfa</span>
                </Link>
                
                <Link 
                  to="/urunler" 
                  onClick={() => setShowMobileSidebar(false)}
                  className="flex items-center gap-3 text-gray-700 hover:bg-red-50 rounded-lg p-3 w-full"
                >
                  <span className="text-xl">🥩</span>
                  <span className="font-medium">Ürünler</span>
                </Link>
                
                <Link 
                  to="/hakkimizda" 
                  onClick={() => setShowMobileSidebar(false)}
                  className="flex items-center gap-3 text-gray-700 hover:bg-red-50 rounded-lg p-3 w-full"
                >
                  <span className="text-xl">ℹ️</span>
                  <span className="font-medium">Hakkımızda</span>
                </Link>

                {/* User Menu Items */}
                {currentUser && (
                  <>
                    <div className="divider my-2"></div>
                    
                    {currentUser.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        onClick={() => setShowMobileSidebar(false)}
                        className="flex items-center gap-3 text-gray-700 hover:bg-red-50 rounded-lg p-3 w-full"
                      >
                        <span className="text-xl">⚙️</span>
                        <span className="font-medium">Admin Panel</span>
                      </Link>
                    )}
                    
                    <Link 
                      to="/siparisler" 
                      onClick={() => setShowMobileSidebar(false)}
                      className="flex items-center gap-3 text-gray-700 hover:bg-red-50 rounded-lg p-3 w-full"
                    >
                      <span className="text-xl">📦</span>
                      <span className="font-medium">Siparişlerim</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200">
              {currentUser ? (
                <button 
                  onClick={handleLogout}
                  className="btn btn-error btn-block gap-2"
                >
                  🚪 Çıkış Yap
                </button>
              ) : (
                <Link 
                  to="/giris" 
                  onClick={() => setShowMobileSidebar(false)}
                  className="btn btn-warning btn-block gap-2"
                >
                  🔑 Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
        )}
      </>
    );
  };

export default Header;