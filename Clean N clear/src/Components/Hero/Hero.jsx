import React, { useEffect, useState } from "react";
import "./Hero.css";

import slider1 from "../../images/Slider1.png";
import slider2 from "../../images/Slider2.png";
import slider3 from "../../images/Slider3.png";
import slider4 from "../../images/Slider4.png";

const slides = [slider1, slider2, slider3, slider4];

const AUTO_DELAY = 4500;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_DELAY);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="hero" aria-label="Clean N Clear">
      <div className="hero__slides">
        {slides.map((image, index) => (
          <div
            key={index}
            className={`hero__slide ${
              index === currentSlide ? "hero__slide--active" : ""
            }`}
          >
            <img
              src={image}
              alt={`Clean N Clear slide ${index + 1}`}
              className="hero__image"
            />
          </div>
        ))}
      </div>

      {/* Previous */}
      <button
        type="button"
        className="hero__arrow hero__arrow--prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* Next */}
      <button
        type="button"
        className="hero__arrow hero__arrow--next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Pagination */}
      <div className="hero__pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`hero__dot ${
              index === currentSlide ? "hero__dot--active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;