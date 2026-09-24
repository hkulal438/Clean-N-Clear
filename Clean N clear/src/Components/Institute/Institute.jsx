import React from "react";
import { Link } from "react-router-dom";
import "./Institute.css";

const cleaningAreas = [
  {
    number: "01",
    title: "ENTRY & COMMON AREAS",
    description:
      "Maintain clean and welcoming entrances, corridors and shared spaces.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "02",
    title: "FLOORS",
    description:
      "Cleaning solutions and equipment for regular floor care and maintenance.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "03",
    title: "WASHROOMS",
    description:
      "Products and supplies for regular washroom cleaning and maintenance.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "04",
    title: "OFFICES & ROOMS",
    description:
      "Practical cleaning solutions for offices, rooms and working environments.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "05",
    title: "HIGH-TRAFFIC AREAS",
    description:
      "Cleaning products and equipment for areas that require regular maintenance.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85",
  },
];

const Institute = () => {
  return (
    <main className="cnc-institute-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="cnc-institute-hero">
        <div className="cnc-institute-hero-overlay"></div>

        <div className="cnc-institute-hero-content">

          <span className="cnc-institute-eyebrow">
            INSTITUTIONAL CLEANING
          </span>

          <h1>
            INSTITUTIONAL CLEANING SOLUTIONS
          </h1>

          <h2>
            Cleaning Solutions for Demanding Environments
          </h2>

          <p>
            Cleaning chemicals, tools and professional equipment for
            institutional cleaning requirements.
          </p>

          <div className="cnc-institute-hero-actions">

            <Link
              to="/products"
              className="cnc-institute-btn cnc-institute-btn-primary"
            >
              Explore Products
            </Link>

            <Link
              to="/contact"
              className="cnc-institute-btn cnc-institute-btn-outline"
            >
              Request an Enquiry
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          CLEANING AREAS
      ===================================================== */}

      <section className="cnc-institute-areas">

        <div className="cnc-institute-container">

          <div className="cnc-institute-section-heading">

            <span>CLEANING AREAS</span>

            <h2>
              Cleaning Areas for Institutional Environments
            </h2>

            <p>
              Institutional cleaning involves different environments
              and tasks. Our range supports everyday cleaning and
              maintenance across key areas.
            </p>

          </div>


          <div className="cnc-institute-area-grid">

            {cleaningAreas.map((area, index) => (

              <article
                className="cnc-institute-area-card"
                key={area.number}
              >

                <div className="cnc-institute-area-image">

                  <img
                    src={area.image}
                    alt={area.title}
                    loading={index < 2 ? "eager" : "lazy"}
                  />

                </div>

                <div className="cnc-institute-area-overlay"></div>

                <div className="cnc-institute-area-content">

                  <span>{area.number}</span>

                  <h3>{area.title}</h3>

                  <p>{area.description}</p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cnc-institute-cta">

        <div className="cnc-institute-cta-inner">

          <div className="cnc-institute-cta-text">

            <span>
              INSTITUTIONAL CLEANING REQUIREMENTS
            </span>

            <h2>
              Planning cleaning supplies for your institution?
            </h2>

            <p>
              Tell us about your cleaning requirements and our team
              can help you explore suitable products, tools and
              equipment.
            </p>

          </div>


          <Link
            to="/contact"
            className="cnc-institute-cta-action"
          >
            <span>Request an Enquiry</span>
            <strong>↗</strong>
          </Link>

        </div>

      </section>

    </main>
  );
};

export default Institute;