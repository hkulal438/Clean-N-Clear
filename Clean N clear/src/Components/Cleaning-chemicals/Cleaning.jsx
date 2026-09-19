import React, { useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaArrowRight,
  FaFlask,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import chemic1 from "../../images/chemic1.png";
import chemic2 from "../../images/chemic2.png";
import chemic3 from "../../images/chemic3.png";
import chemic4 from "../../images/chemic4.png";
import chemic5 from "../../images/chemic5.png";
import chemic6 from "../../images/chemic6.png";

import "./Cleaning.css";

const Cleaning = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const chemicals = [
    {
      image: chemic1,
      title: "Professional Cleaning Solutions",
    },
    {
      image: chemic2,
      title: "Healthcare Cleaning",
    },
    {
      image: chemic3,
      title: "Hygiene & Disinfection",
    },
    {
      image: chemic4,
      title: "Surface Care",
    },
    {
      image: chemic5,
      title: "Specialized Cleaning",
    },
    {
      image: chemic6,
      title: "Complete Hygiene Solutions",
    },
  ];

  return (
    <>
      {/* =====================================================
          J6 CLEANING CHEMICALS SECTION
      ===================================================== */}

      <section className="j6-cleaning-section">
        <div className="j6-cleaning-container">

          {/* HEADING */}
          <div className="j6-cleaning-heading">
            <span className="j6-cleaning-label">
              <FaFlask />
              Professional Cleaning Solutions
            </span>

            <h2>
              Cleaning <span>Chemicals</span>
            </h2>

            <p>
              Explore our range of professional cleaning chemicals designed
              for clinics and healthcare environments. Effective, reliable,
              and easy to use, our solutions help maintain clean, hygienic,
              and safe spaces every day.
            </p>
          </div>

          {/* FEATURES */}
          <div className="j6-cleaning-features">

            <div className="j6-cleaning-feature">
              <div className="j6-feature-icon">
                <FaCheckCircle />
              </div>

              <div className="j6-feature-content">
                <h4>Effective</h4>
                <p>Powerful cleaning performance</p>
              </div>
            </div>

            <div className="j6-cleaning-feature">
              <div className="j6-feature-icon">
                <FaShieldAlt />
              </div>

              <div className="j6-feature-content">
                <h4>Reliable</h4>
                <p>Designed for professional use</p>
              </div>
            </div>

            <div className="j6-cleaning-feature">
              <div className="j6-feature-icon">
                <FaFlask />
              </div>

              <div className="j6-feature-content">
                <h4>Professional</h4>
                <p>Suitable for healthcare environments</p>
              </div>
            </div>

          </div>

          {/* GALLERY */}
          <div className="j6-cleaning-gallery">
            {chemicals.map((chemical, index) => (
              <div
                className="j6-cleaning-card"
                key={index}
                onClick={() => setSelectedImage(chemical.image)}
              >
                <img
                  src={chemical.image}
                  alt={chemical.title}
                />

                <div className="j6-cleaning-overlay">
                  <div className="j6-cleaning-plus">
                    <FaPlus />
                  </div>

                  <div className="j6-cleaning-card-title">
                    {chemical.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="j6-cleaning-bottom">

            <div className="j6-cleaning-bottom-content">
              <h3>
                Maintain a Cleaner, Safer Environment
              </h3>

              <p>
                Discover cleaning chemical solutions designed to support
                professional hygiene and everyday cleaning requirements.
              </p>
            </div>

            <a
              href="/contact"
              className="j6-cleaning-btn"
            >
              Explore Solutions
              <FaArrowRight />
            </a>

          </div>

        </div>
      </section>

      {/* =====================================================
          IMAGE LIGHTBOX
      ===================================================== */}

      {selectedImage && (
        <div
          className="j6-cleaning-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="j6-cleaning-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <FaTimes />
          </button>

          <img
            src={selectedImage}
            alt="Cleaning chemical"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Cleaning;