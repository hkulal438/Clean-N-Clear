import React, { useEffect, useState } from "react";
import "./Hero.css";

import slider1 from "../../images/Slider1.png";
import slider2 from "../../images/Slider2.png";
import slider3 from "../../images/Slider3.png";

const slides = [slider1, slider2, slider3];

const AUTO_DELAY = 4500;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ================================
     AUTO SLIDE
     ================================ */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        return (prev + 1) % slides.length;
      });
    }, AUTO_DELAY);

    return () => {
      clearInterval(timer);
    };
  }, []);

  /* ================================
     NEXT
     ================================ */

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      return (prev + 1) % slides.length;
    });
  };

  /* ================================
     PREVIOUS
     ================================ */

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      return (prev - 1 + slides.length) % slides.length;
    });
  };

  /* ================================
     GO TO SLIDE
     ================================ */

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="cnc-hero-slider"
      aria-label="Clean N Clear"
    >

      {/* ==========================================
          SLIDES
          ========================================== */}

      <div className="cnc-hero-slider__slides">

        {slides.map((image, index) => (
          <div
            key={index}
            className={`cnc-hero-slider__slide ${
              index === currentSlide
                ? "cnc-hero-slider__slide--active"
                : ""
            }`}
          >

            <img
              src={image}
              alt={`Clean N Clear slide ${index + 1}`}
              className="cnc-hero-slider__image"
            />

          </div>
        ))}

      </div>


      {/* ==========================================
          PREVIOUS BUTTON
          ========================================== */}

      <button
        type="button"
        className="cnc-hero-slider__arrow cnc-hero-slider__arrow--prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <span aria-hidden="true">‹</span>
      </button>


      {/* ==========================================
          NEXT BUTTON
          ========================================== */}

      <button
        type="button"
        className="cnc-hero-slider__arrow cnc-hero-slider__arrow--next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span aria-hidden="true">›</span>
      </button>


      {/* ==========================================
          PAGINATION
          ========================================== */}

      <div
        className="cnc-hero-slider__pagination"
        aria-label="Slider navigation"
      >

        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`cnc-hero-slider__dot ${
              index === currentSlide
                ? "cnc-hero-slider__dot--active"
                : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={
              index === currentSlide
                ? "true"
                : undefined
            }
          />
        ))}

      </div>

    </section>
  );
};

export default Hero;