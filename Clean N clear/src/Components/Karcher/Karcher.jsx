import React, { useEffect, useRef, useState } from "react";
import "./Karcher.css";

import Karcher1 from "../../images/Karcher1.jpg";
import Karcher2 from "../../images/Karcher2.jpg";
import Karcher3 from "../../images/Karcher3.png";
import Karcher4 from "../../images/Karcher4.png";

const slides = [
  {
    image: Karcher1,
    title: "Professional Cleaning Technology",
    subtitle: "Authorised Kärcher Distributor",
    paragraph:
      "Clean N Clear supplies professional Kärcher cleaning equipment for reliable solutions and demanding cleaning requirements.",
  },
  {
    image: Karcher2,
    title: "Powerful Cleaning Solutions",
    subtitle: "Built for Professional Performance",
    paragraph:
      "Discover professional cleaning equipment designed to deliver powerful, efficient and consistent cleaning performance.",
  },
  {
    image: Karcher3,
    title: "Reliable Equipment",
    subtitle: "Technology You Can Depend On",
    paragraph:
      "Clean N Clear provides Kärcher solutions for commercial, institutional and professional cleaning applications.",
  },
  {
    image: Karcher4,
    title: "Professional Cleaning",
    subtitle: "Kärcher Solutions by Clean N Clear",
    paragraph:
      "From demanding cleaning tasks to everyday maintenance, choose professional technology for better cleaning results.",
  },
];

function Karcher() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slicesRef = useRef([]);
  const contentOverlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const updateBackgroundSize = () => {
    const isMobile = window.innerWidth <= 768;
    const visibleCount = isMobile ? 3 : 5;

    slicesRef.current.forEach((slice) => {
      if (slice) {
        slice.style.backgroundSize = `${visibleCount * 100}% 100%`;
      }
    });
  };

  const showSlide = (index) => {
    const slide = slides[index];
    const slices = slicesRef.current.filter(Boolean);

    clearTimers();

    slices.forEach((slice) => {
      slice.style.backgroundImage = `url("${slide.image}")`;
      slice.classList.remove("active");
    });

    if (contentOverlayRef.current) {
      contentOverlayRef.current.classList.remove("show");
    }

    const sliceTimer = setTimeout(() => {
      const isMobile = window.innerWidth <= 768;

      slices.forEach((slice, sliceIndex) => {
        if (isMobile && sliceIndex > 2) return;
        slice.classList.add("active");
      });

      const contentTimer = setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.textContent = slide.title;
        }

        if (subtitleRef.current) {
          subtitleRef.current.textContent = slide.subtitle;
        }

        if (paragraphRef.current) {
          paragraphRef.current.textContent = slide.paragraph;
        }

        if (contentOverlayRef.current) {
          contentOverlayRef.current.classList.add("show");
        }

        const nextTimer = setTimeout(() => {
          setCurrentSlide((previous) => {
            const nextIndex = (previous + 1) % slides.length;
            showSlide(nextIndex);
            return nextIndex;
          });
        }, 3000);

        timersRef.current.push(nextTimer);
      }, 2100);

      timersRef.current.push(contentTimer);
    }, 100);

    timersRef.current.push(sliceTimer);
  };

  useEffect(() => {
    updateBackgroundSize();

    const initialTimer = setTimeout(() => {
      showSlide(0);
    }, 50);

    const handleResize = () => {
      updateBackgroundSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initialTimer);
      clearTimers();
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="karcher-slider-container">

      {/* =====================================================
          YOUR ORIGINAL 5 SLICES — DO NOT CHANGE ORDER
          ===================================================== */}

      {[0, 1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="karcher-slice"
          ref={(element) => {
            slicesRef.current[item] = element;
          }}
        />
      ))}

      {/* =====================================================
          BACK TO HOME — ONLY ADDITION
          ===================================================== */}

      <a
        href="/"
        className="karcher-back-home"
        aria-label="Back to Home"
      >
        <span className="karcher-back-arrow">←</span>
        <span>Back to Home</span>
      </a>

      <div className="karcher-color-overlay"></div>

      <div
        className="karcher-content-overlay"
        ref={contentOverlayRef}
      >
        <div className="karcher-tag">
          AUTHORISED KÄRCHER DISTRIBUTOR
        </div>

        <h1 ref={titleRef}></h1>

        <h2 ref={subtitleRef}></h2>

        <p ref={paragraphRef}></p>

        <div className="karcher-buttons">
          <a
            href="/products/professional-cleaning-equipment"
            className="karcher-btn karcher-btn-primary"
          >
            Explore Equipment
            <span>→</span>
          </a>

          <a
            href="/contact"
            className="karcher-btn karcher-btn-secondary"
          >
            Enquire Now
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Karcher;