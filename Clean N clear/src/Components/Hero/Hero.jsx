
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

import slider1 from "../../images/Slider1.png";
import slider2 from "../../images/Slider2.png";
import slider3 from "../../images/Slider3.png";

const slides = [slider1, slider2, slider3];

const AUTO_DELAY = 4500;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_DELAY);

    return () => clearInterval(timer);
  }, []);

  /* NEXT SLIDE */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /* PREVIOUS SLIDE */
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  /* GO TO SELECTED SLIDE */
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="cnc-hero-slider"
      aria-label="Clean N Clear"
    >
      {/* SLIDES */}
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
            {/* ORIGINAL SLIDE IMAGE */}
            <img
              src={image}
              alt={`Clean N Clear slide ${index + 1}`}
              className="cnc-hero-slider__image"
            />

            {/* SLIDER 2 TEXT OVERLAY */}
            {index === 1 && (
              <div className="cnc-hero-slider__overlay cnc-hero-slider__overlay--black">
                <h1>
                  Your complete
                  <br />
                  Cleaning partner
                </h1>

                <p>
                  Thoughtful care for cleaner, fresher,
                  happier spaces.
                </p>

                <Link
                  to="/products"
                  className="cnc-hero-slider__cta"
                >
                  Explore Products
                </Link>
              </div>
            )}

            {/* SLIDER 3 TEXT OVERLAY */}
            {index === 2 && (
              <div className="cnc-hero-slider__overlay">
                <h1>CLEAN SMARTER. WORK BETTER.</h1>

                <p>
                  A little more care for cleaner, healthier,
                  happier spaces.
                </p>

                <Link
                  to="/karcher"
                  className="cnc-hero-slider__cta"
                >
                  Explore Products
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PREVIOUS BUTTON */}
      <button
        type="button"
        className="cnc-hero-slider__arrow cnc-hero-slider__arrow--prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <span aria-hidden="true">‹</span>
      </button>

      {/* NEXT BUTTON */}
      <button
        type="button"
        className="cnc-hero-slider__arrow cnc-hero-slider__arrow--next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span aria-hidden="true">›</span>
      </button>

      {/* PAGINATION */}
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
              index === currentSlide ? "true" : undefined
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
