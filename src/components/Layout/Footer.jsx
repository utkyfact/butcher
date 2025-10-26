import React from 'react';

const Footer = () => (
    <footer className="footer footer-center p-6 sm:p-8 lg:p-10 bg-red-700 text-white mt-12 sm:mt-16">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <p className="font-bold text-xl sm:text-2xl lg:text-3xl mb-2">🥩 Kasabım</p>
          <p className="text-xs sm:text-sm text-red-100">Taze ve Kaliteli Et Ürünleri</p>
          <p className="text-xs mt-3 sm:mt-4 text-red-200">© 2025 - Tüm hakları saklıdır</p>
        </div>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-3 sm:gap-4 lg:gap-6">
            <p className="text-xs sm:text-sm whitespace-nowrap">📞 0555 123 45 67</p>
            <p className="text-xs sm:text-sm whitespace-nowrap">📧 info@kasabim.com</p>
            <p className="text-xs sm:text-sm whitespace-nowrap">📍 İstanbul, Türkiye</p>
          </div>
        </div>
      </div>
    </footer>
  );

export default Footer;