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
      <section className="cleaning-section">
        <div className="cleaning-container">

          {/* Section Heading */}
          <div className="cleaning-heading">
            <span className="cleaning-label">
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

          {/* Feature Strip */}
          <div className="cleaning-features">

            <div className="cleaning-feature">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <div>
                <h4>Effective</h4>
                <p>Powerful cleaning performance</p>
              </div>
            </div>

            <div className="cleaning-feature">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <div>
                <h4>Reliable</h4>
                <p>Designed for professional use</p>
              </div>
            </div>

            <div className="cleaning-feature">
              <div className="feature-icon">
                <FaFlask />
              </div>
              <div>
                <h4>Professional</h4>
                <p>Suitable for healthcare environments</p>
              </div>
            </div>

          </div>

          {/* Gallery */}
          <div className="cleaning-gallery">
            {chemicals.map((chemical, index) => (
              <div
                className="cleaning-card"
                key={index}
                onClick={() => setSelectedImage(chemical.image)}
              >
                <img
                  src={chemical.image}
                  alt={chemical.title}
                />

                <div className="cleaning-overlay">
                  <div className="cleaning-plus">
                    <FaPlus />
                  </div>

                  <div className="cleaning-card-title">
                    {chemical.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="cleaning-bottom">
            <div>
              <h3>
                Maintain a Cleaner, Safer Environment
              </h3>

              <p>
                Discover cleaning chemical solutions designed to support
                professional hygiene and everyday cleaning requirements.
              </p>
            </div>

            <a href="/contact" className="cleaning-btn">
              Explore Solutions
              <FaArrowRight />
            </a>
          </div>

        </div>
      </section>

      {/* Image Popup */}
      {selectedImage && (
        <div
          className="cleaning-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="cleaning-close"
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