import React from "react";
import { Link } from "react-router-dom";
import "./Commercial.css";

const Commercial = () => {
  const needs = [
    {
      number: "01",
      icon: "🧹",
      title: "Floor Care",
      text: "Products and equipment for maintaining different floor surfaces.",
    },
    {
      number: "02",
      icon: "🚻",
      title: "Washroom Hygiene",
      text: "Cleaning products and tools for washroom maintenance.",
    },
    {
      number: "03",
      icon: "✨",
      title: "Surface Cleaning",
      text: "Solutions for regular cleaning of working and customer-facing areas.",
    },
    {
      number: "04",
      icon: "⚙️",
      title: "Professional Equipment",
      text: "Equipment for larger or demanding cleaning requirements.",
    },
  ];

  const categories = [
    {
      number: "01",
      title: "Cleaning Chemicals",
      text: "Cleaning solutions for everyday and professional requirements.",
      link: "/products/cleaning-chemicals",
    },
    {
      number: "02",
      title: "Cleaning Tools",
      text: "Mops, brushes, buckets, wipers and accessories.",
      link: "/products/cleaning-tools",
    },
    {
      number: "03",
      title: "Professional Equipment",
      text: "Professional cleaning machines and equipment.",
      link: "/products/professional-equipment",
    },
  ];

  const sectors = [
    {
      title: "Offices",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Hotels",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Retail Spaces",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Commercial Buildings",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  return (
    <main className="cnc-commercial-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="cnc-commercial-hero">
        <div className="cnc-commercial-hero-overlay"></div>

        <div className="cnc-commercial-hero-content">
          <span className="cnc-commercial-eyebrow">
            CLEAN N CLEAR
          </span>

          <h1>
            COMMERCIAL
            <br />
            CLEANING SOLUTIONS
          </h1>

          <h2>
            Professional Cleaning Solutions for Commercial Spaces
          </h2>

          <p>
            Cleaning chemicals, tools and professional cleaning equipment
            for maintaining clean and well-managed commercial environments.
          </p>

          <div className="cnc-commercial-hero-actions">
            <Link
              to="/products"
              className="cnc-commercial-btn cnc-commercial-btn-primary"
            >
              Explore Products
            </Link>

            <Link
              to="/request-a-quote"
              className="cnc-commercial-btn cnc-commercial-btn-outline"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT DOES YOUR BUSINESS NEED?
      ===================================================== */}
      <section className="cnc-commercial-needs">
        <div className="cnc-commercial-container">

          <div className="cnc-commercial-section-heading">
            <span>COMMERCIAL CLEANING</span>

            <h2>What Does Your Business Need?</h2>

            <p>
              Explore cleaning solutions suited to different areas and
              cleaning requirements within commercial environments.
            </p>
          </div>

          <div className="cnc-commercial-needs-grid">
            {needs.map((item) => (
              <article
                className="cnc-commercial-need-card"
                key={item.number}
              >
                <div className="cnc-commercial-card-number">
                  {item.number}
                </div>

                <div className="cnc-commercial-card-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <span className="cnc-commercial-card-line"></span>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          PRODUCT CATEGORIES
      ===================================================== */}
      <section className="cnc-commercial-products">
        <div className="cnc-commercial-container">

          <div className="cnc-commercial-section-heading cnc-commercial-heading-light">
            <span>OUR PRODUCT RANGE</span>

            <h2>Product Categories</h2>

            <p>
              Choose from cleaning products and equipment for regular
              commercial cleaning requirements.
            </p>
          </div>

          <div className="cnc-commercial-category-grid">
            {categories.map((category) => (
              <Link
                to={category.link}
                className="cnc-commercial-category-card"
                key={category.number}
              >
                <div className="cnc-commercial-category-top">
                  <span>{category.number}</span>

                  <span className="cnc-commercial-arrow">
                    ↗
                  </span>
                </div>

                <div className="cnc-commercial-category-content">
                  <h3>{category.title}</h3>

                  <p>{category.text}</p>
                </div>

                <div className="cnc-commercial-category-bottom">
                  <span>Explore Category</span>

                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          SUITABLE FOR
      ===================================================== */}
      <section className="cnc-commercial-sectors">
        <div className="cnc-commercial-container">

          <div className="cnc-commercial-section-heading">
            <span>WHERE WE FIT</span>

            <h2>Suitable For</h2>

            <p>
              Cleaning products and equipment suitable for a range of
              commercial environments.
            </p>
          </div>

          <div className="cnc-commercial-sector-grid">
            {sectors.map((sector, index) => (
              <article
                className="cnc-commercial-sector-card"
                key={sector.title}
              >
                <div className="cnc-commercial-sector-image">
                  <img
                    src={sector.image}
                    alt={`${sector.title} commercial environment`}
                    loading="lazy"
                  />
                </div>

                <div className="cnc-commercial-sector-overlay"></div>

                <div className="cnc-commercial-sector-content">
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{sector.title}</h3>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="cnc-commercial-cta">
        <div className="cnc-commercial-cta-inner">

          <div className="cnc-commercial-cta-text">
            <span>LET'S TALK</span>

            <h2>
              Have a commercial
              <br />
              cleaning requirement?
            </h2>

            <p>
              Tell us what you need and our team can help you explore
              suitable cleaning products and equipment.
            </p>
          </div>

          <Link
            to="/request-a-quote"
            className="cnc-commercial-cta-button"
          >
            <span>Tell Us What You Need</span>

            <span>→</span>
          </Link>

        </div>
      </section>

    </main>
  );
};

export default Commercial;