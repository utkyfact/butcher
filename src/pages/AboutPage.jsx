import React from 'react';

const AboutPage = () => {
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Hakkımızda</h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="card bg-white shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title text-2xl">Kasabım - Taze Et Uzmanı</h2>
                <p className="text-gray-700 leading-relaxed">
                  1990 yılından beri İstanbul'da hizmet veren Kasabım, kaliteli ve taze et ürünleri sunma misyonuyla 
                  yola çıkmıştır. Müşteri memnuniyetini ön planda tutarak, her gün taze tedarik edilen ürünlerimizle 
                  sofranıza sağlık ve lezzet getiriyoruz.
                </p>
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card bg-red-50 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title">Misyonumuz</h3>
                  <p>En taze ve kaliteli et ürünlerini, güvenilir ve hızlı bir şekilde müşterilerimize ulaştırmak.</p>
                </div>
              </div>
              <div className="card bg-red-50 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title">Vizyonumuz</h3>
                  <p>Türkiye'nin en güvenilir online kasabı olmak ve dijital dönüşümde öncü rol oynamak.</p>
                </div>
              </div>
            </div>
  
            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">İletişim</h2>
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="font-semibold">📍 Adres:</span>
                    Atatürk Mahallesi, Kasap Sokak No:123, Kadıköy/İstanbul
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold">📞 Telefon:</span>
                    0555 123 45 67
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold">📧 E-posta:</span>
                    info@kasabim.com
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold">🕐 Çalışma Saatleri:</span>
                    Pazartesi - Cumartesi: 09:00 - 20:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  };

export default AboutPage;