import React from 'react';

const Features = () => {
    const features = [
      { icon: '📦', title: 'Taze Ürünler', desc: 'Her gün taze tedarik edilen kaliteli etler' },
      { icon: '⏰', title: 'Hızlı Teslimat', desc: 'Belirlediğiniz saatte hazır sipariş' },
      { icon: '📅', title: 'Randevu Sistemi', desc: 'Online sipariş ve randevu kolaylığı' }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card bg-white shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body items-center text-center">
              <div className="text-red-600 text-4xl">{feature.icon}</div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default Features;