import React from 'react';

const Footer = () => (
    <footer className="footer footer-center p-10 bg-red-700 text-white mt-16">
      <div>
        <p className="font-bold text-2xl">🥩 Kasabım</p>
        <p className="text-sm">Taze ve Kaliteli Et Ürünleri</p>
        <p className="text-xs mt-2">© 2025 - Tüm hakları saklıdır</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <p className="text-sm">📞 0555 123 45 67</p>
          <p className="text-sm">📧 info@kasabim.com</p>
          <p className="text-sm">📍 İstanbul, Türkiye</p>
        </div>
      </div>
    </footer>
  );

export default Footer;