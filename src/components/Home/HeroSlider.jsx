import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
      { image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200', title: 'Taze Et Günlük Tedarik', subtitle: 'En kaliteli etler kapınızda' },
      { image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1200', title: 'Mangal Keyfi', subtitle: '%100 yerli ve organik' },
      { image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=1200', title: 'Online Sipariş', subtitle: 'İstediğiniz saatte hazır' }
    ];
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div className="carousel w-full h-[450px] md:h-[600px] lg:h-[700px] relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item w-full absolute transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                    <button className="btn btn-warning btn-lg">Alışverişe Başla</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    );
  };

export default HeroSlider;