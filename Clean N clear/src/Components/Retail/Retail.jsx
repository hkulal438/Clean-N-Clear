import React from "react";
import { Link } from "react-router-dom";
import "./Retail.css";

const productCategories = [
  {
    number: "01",
    title: "CLEANING CHEMICALS",
    description:
      "Floor cleaners, detergents, surface cleaners and other everyday cleaning chemicals.",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1000&q=90",
    link: "/products/cleaning-chemicals",
  },
  {
    number: "02",
    title: "CLEANING TOOLS",
    description:
      "Mops, brooms, brushes and practical tools for everyday cleaning tasks.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=90",
    link: "/products/cleaning-tools",
  },
  {
    number: "03",
    title: "HOUSEHOLD PRODUCTS",
    description:
      "Cleaning products and equipment designed for regular household requirements.",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1000&q=90",
    link: "/products/household-cleaning",
  },
  {
    number: "04",
    title: "HYGIENE SUPPLIES",
    description:
      "Hand hygiene, washroom and everyday hygiene products for homes and workplaces.",
    image:
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=1000&q=90",
    link: "/products/hygiene-supplies",
  },
  {
    number: "05",
    title: "EQUIPMENT",
    description:
      "Professional cleaning equipment for customers looking for more than basic cleaning products.",
    image:
      "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1000&q=90",
    link: "/products/professional-equipment",
  },
];

const Retail = () => {
  return (
    <main className="cnc-retail-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="cnc-retail-hero">

        <div className="cnc-retail-hero-image"></div>

        <div className="cnc-retail-hero-overlay"></div>

        <div className="cnc-retail-hero-content">

          <span className="cnc-retail-eyebrow">
            CLEAN N CLEAR
          </span>

          <h1>
            RETAIL CLEANING PRODUCTS
          </h1>

          <h2>
            Cleaning Essentials for Everyday Requirements
          </h2>

          <p>
            Explore cleaning chemicals, tools, household products,
            hygiene supplies and equipment for your everyday cleaning needs.
          </p>

          <div className="cnc-retail-hero-actions">

            <Link
              to="/products"
              className="cnc-retail-btn cnc-retail-btn-primary"
            >
              Browse Products
            </Link>

            <Link
              to="/contact"
              className="cnc-retail-btn cnc-retail-btn-outline"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCT CATEGORIES
      ===================================================== */}

      <section className="cnc-retail-categories">

        <div className="cnc-retail-container">

          <div className="cnc-retail-section-heading">

            <span>
              PRODUCT CATEGORIES
            </span>

            <h2>
              Explore Our Cleaning Products
            </h2>

          </div>


          <div className="cnc-retail-category-grid">

            {productCategories.map((category) => (

              <article
                className="cnc-retail-category-card"
                key={category.number}
              >

                <div className="cnc-retail-category-image">

                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                  />

                </div>

                <div className="cnc-retail-category-content">

                  <span className="cnc-retail-category-number">
                    {category.number}
                  </span>

                  <h3>
                    {category.title}
                  </h3>

                  <p>
                    {category.description}
                  </p>

                  <Link
                    to={category.link}
                    className="cnc-retail-category-link"
                  >
                    View Products
                    <span>↗</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="cnc-retail-cta">

        <div className="cnc-retail-cta-inner">

          <div className="cnc-retail-cta-content">

            <span>
              CLEAN N CLEAR
            </span>

            <h2>
              Find the cleaning products you need.
            </h2>

          </div>


          <div className="cnc-retail-cta-actions">

            <Link
              to="/products"
              className="cnc-retail-cta-primary"
            >
              Browse Products
            </Link>

            <Link
              to="/contact"
              className="cnc-retail-cta-secondary"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Retail;