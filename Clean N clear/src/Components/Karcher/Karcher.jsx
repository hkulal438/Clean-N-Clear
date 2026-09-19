import React, { useEffect, useRef, useState } from "react";
import "./Karcher.css";

import Karcher1 from "../../images/Karcher1.jpg";
import Karcher2 from "../../images/Karcher2.jpg";
import Karcher3 from "../../images/Karcher3.png";
import Karcher4 from "../../images/Karcher4.png";

/* =====================================================
   KÄRCHER SLIDES
===================================================== */

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

/* =====================================================
   KÄRCHER COMPONENT
===================================================== */

function Karcher() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slicesRef = useRef([]);
  const contentOverlayRef = useRef(null);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);

  const timersRef = useRef([]);

  /* =====================================================
     CLEAR TIMERS
  ===================================================== */

  const clearTimers = () => {
    timersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });

    timersRef.current = [];
  };

  /* =====================================================
     UPDATE BACKGROUND SIZE
  ===================================================== */

  const updateBackgroundSize = () => {
    const isMobile = window.innerWidth <= 768;

    const visibleCount = isMobile ? 3 : 5;

    const size = `${visibleCount * 100}% 100%`;

    slicesRef.current.forEach((slice) => {
      if (slice) {
        slice.style.backgroundSize = size;
      }
    });
  };

  /* =====================================================
     SHOW SLIDE
  ===================================================== */

  const showSlide = (index) => {
    const slide = slides[index];

    const slices = slicesRef.current.filter(Boolean);

    const contentOverlay = contentOverlayRef.current;

    clearTimers();

    /* ===================================================
       UPDATE IMAGE ON ALL SLICES
    =================================================== */

    slices.forEach((slice) => {
      slice.style.backgroundImage = `url("${slide.image}")`;

      slice.classList.remove("active");
    });

    /* ===================================================
       HIDE CONTENT
    =================================================== */

    if (contentOverlay) {
      contentOverlay.classList.remove("show");
    }

    /* ===================================================
       START FALLING ANIMATION
    =================================================== */

    const resetTimer = setTimeout(() => {
      const isMobile = window.innerWidth <= 768;

      slices.forEach((slice, sliceIndex) => {
        /* Hide slice 4 and 5 on mobile */
        if (isMobile && (sliceIndex === 3 || sliceIndex === 4)) {
          return;
        }

        slice.classList.add("active");
      });

      /* =================================================
         SHOW CONTENT AFTER SLICES FALL
      ================================================= */

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

        if (contentOverlay) {
          contentOverlay.classList.add("show");
        }

        /* =================================================
           NEXT SLIDE
        ================================================= */

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

    timersRef.current.push(resetTimer);
  };

  /* =====================================================
     INITIALIZE SLIDER
  ===================================================== */

  useEffect(() => {
    updateBackgroundSize();

    const startTimer = setTimeout(() => {
      showSlide(currentSlide);
    }, 50);

    const handleResize = () => {
      updateBackgroundSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(startTimer);

      clearTimers();

      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <section className="karcher-slider-container">

      {/* =================================================
          SLICE 1
      ================================================= */}

      <div
        className="karcher-slice"
        ref={(element) => {
          slicesRef.current[0] = element;
        }}
      />

      {/* =================================================
          SLICE 2
      ================================================= */}

      <div
        className="karcher-slice"
        ref={(element) => {
          slicesRef.current[1] = element;
        }}
      />

      {/* =================================================
          SLICE 3
      ================================================= */}

      <div
        className="karcher-slice"
        ref={(element) => {
          slicesRef.current[2] = element;
        }}
      />

      {/* =================================================
          SLICE 4
      ================================================= */}

      <div
        className="karcher-slice"
        ref={(element) => {
          slicesRef.current[3] = element;
        }}
      />

      {/* =================================================
          SLICE 5
      ================================================= */}

      <div
        className="karcher-slice"
        ref={(element) => {
          slicesRef.current[4] = element;
        }}
      />

      {/* =================================================
          YELLOW / BLACK OVERLAY
      ================================================= */}

      <div className="karcher-color-overlay"></div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="karcher-content-overlay"
        ref={contentOverlayRef}
      >

        {/* AUTHORISED DISTRIBUTOR */}
        <div className="karcher-tag">
          AUTHORISED KÄRCHER DISTRIBUTOR
        </div>

        {/* TITLE */}
        <h1 ref={titleRef}></h1>

        {/* SUBTITLE */}
        <h2 ref={subtitleRef}></h2>

        {/* DESCRIPTION */}
        <p ref={paragraphRef}></p>

        {/* =================================================
            BUTTONS
        ================================================= */}

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

/* =====================================================
   IMPORTANT:
   DEFAULT EXPORT
===================================================== */

export default Karcher;