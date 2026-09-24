import React from "react";
import { Link } from "react-router-dom";
import "./House.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================================================
   HOUSEHOLD AREA IMAGES
   ========================================================= */

const homeAreas = [
  {
    title: "FLOOR CARE",
    description: "Keep floors fresh, clean and well maintained.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "KITCHEN",
    description: "Everyday cleaning solutions for kitchen spaces.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "BATHROOM",
    description: "Products for a cleaner and fresher bathroom.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "SURFACES",
    description: "Simple solutions for everyday surface cleaning.",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=85",
  },
];


/* =========================================================
   HOUSEHOLD PRODUCT IMAGES
   Existing project images
   ========================================================= */

const householdProducts = [
  {
    id: "household-cleaner-product",
    name: "Cleaner Product",
    description: "A practical cleaning solution for everyday household use.",
    image: "/src/images/house/Cleaner Product.webp",
  },
  {
    id: "household-cleaning-acid-5ltr",
    name: "Cleaning Acid 5Ltr",
    description: "Cleaning solution for suitable household cleaning requirements.",
    image: "/src/images/house/Cleaning Acid 5Ltr.webp",
  },
  {
    id: "household-floor-cleaner",
    name: "Floor Cleaner",
    description: "Designed for regular floor cleaning and maintenance.",
    image: "/src/images/house/Floor Cleaner.webp",
  },
  {
    id: "push-sweeper-s4-twin",
    name: "Push Sweeper S 4 Twin",
    description: "Convenient sweeping equipment for regular cleaning.",
    image: "/src/images/house/Push sweeper S 4 Twin.jpg",
  },
  {
    id: "spray-extraction-cleaner-se4001",
    name: "Spray Extraction Cleaner SE 4001",
    description: "Equipment for deeper cleaning requirements.",
    image: "/src/images/house/Spray extraction cleaner SE 4001.jpg",
  },
  {
    id: "household-toilet-cleaner-5ltr",
    name: "Toilet Cleaner 5Ltr",
    description: "Cleaning solution for regular bathroom maintenance.",
    image: "/src/images/house/Toilet Cleaner 5Ltr.webp",
  },
];


/* =========================================================
   HOUSEHOLD RANGE
   ========================================================= */

const householdRange = [
  {
    number: "01",
    title: "Cleaning Chemicals",
    description:
      "Cleaning solutions for everyday household requirements.",
    link: "/products/cleaning-chemicals",
  },
  {
    number: "02",
    title: "Cleaning Tools",
    description:
      "Practical tools for routine cleaning around the home.",
    link: "/products/cleaning-tools",
  },
  {
    number: "03",
    title: "Household Cleaning Products",
    description:
      "Selected products for regular household cleaning and maintenance.",
    link: "/products/household-cleaning",
  },
  {
    number: "04",
    title: "Selected Equipment",
    description:
      "Equipment options for more demanding household cleaning tasks.",
    link: "/products/professional-equipment",
  },
];


const House = () => {
  return (
    <main className="cnc-house-page">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="cnc-house-hero">

        <div className="cnc-house-hero-overlay"></div>

        <div className="cnc-house-hero-content">

          <span className="cnc-house-eyebrow">
            HOUSEHOLD CLEANING
          </span>

          <h1>
            HOUSEHOLD
            <br />
            CLEANING SOLUTIONS
          </h1>

          <h2>
            Everyday Cleaning Made Simple
          </h2>

          <p>
            Cleaning products and tools for everyday household
            cleaning and maintenance.
          </p>

          <div className="cnc-house-hero-actions">

            <Link
              to="/products/household-cleaning"
              className="cnc-house-btn cnc-house-btn-primary"
            >
              Explore Products
            </Link>

            <Link
              to="/contact"
              className="cnc-house-btn cnc-house-btn-outline"
            >
              Get a Quote
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOR EVERY PART OF YOUR HOME
          ===================================================== */}

      <section className="cnc-house-areas">

        <div className="cnc-house-container">

          <div className="cnc-house-section-heading">

            <span>HOME CLEANING</span>

            <h2>
              For Every Part
              <br />
              of Your Home
            </h2>

            <p>
              Simple cleaning solutions designed to fit into
              everyday household routines.
            </p>

          </div>


          <div className="cnc-house-area-grid">

            {homeAreas.map((area, index) => (
              <div
                className="cnc-house-area-card"
                key={area.title}
              >

                <div className="cnc-house-area-image">

                  <img
                    src={area.image}
                    alt={area.title}
                    loading={index > 1 ? "lazy" : "eager"}
                  />

                </div>

                <div className="cnc-house-area-overlay"></div>

                <div className="cnc-house-area-content">

                  <span>
                    0{index + 1}
                  </span>

                  <h3>
                    {area.title}
                  </h3>

                  <p>
                    {area.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR HOUSEHOLD RANGE
          ===================================================== */}

      <section className="cnc-house-range">

        <div className="cnc-house-container">

          <div className="cnc-house-section-heading">

            <span>OUR PRODUCTS</span>

            <h2>
              Our Household Range
            </h2>

            <p>
              Explore cleaning products, tools and selected
              equipment for everyday household requirements.
            </p>

          </div>


          <div className="cnc-house-range-list">

            {householdRange.map((item) => (
              <Link
                to={item.link}
                className="cnc-house-range-row"
                key={item.number}
              >

                <span className="cnc-house-range-number">
                  {item.number}
                </span>

                <div className="cnc-house-range-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>

                <span className="cnc-house-range-arrow">
                  ↗
                </span>

              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCT CARDS
          ===================================================== */}

      <section className="cnc-house-products">

        <div className="cnc-house-container">

          <div className="cnc-house-section-heading">

            <span>HOUSEHOLD PRODUCTS</span>

            <h2>
              Selected Products
            </h2>

            <p>
              A selection of products available for household
              cleaning and maintenance.
            </p>

          </div>


          <div className="cnc-house-product-grid">

            {householdProducts.map((product) => (
              <article
                className="cnc-house-product-card"
                key={product.id}
              >

                <div className="cnc-house-product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />

                </div>

                <div className="cnc-house-product-content">

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <Link
                    to="/products/household-cleaning"
                    className="cnc-house-product-link"
                  >
                    View Product
                    <span>↗</span>
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
          ===================================================== */}

      <section className="cnc-house-cta">

        <div className="cnc-house-cta-inner">

          <div className="cnc-house-cta-text">

            <span>
              NEED HELP CHOOSING?
            </span>

            <h2>
              Looking for a product
              for your home?
            </h2>

            <p>
              Tell us what you are looking for and our team
              can help you explore suitable cleaning products
              and solutions.
            </p>

          </div>


          <Link
            to="/contact"
            className="cnc-house-cta-action"
          >

            <span>
              Send an Enquiry
            </span>

            <strong>
              ↗
            </strong>

          </Link>

        </div>

      </section>

    </main>
  );
};

export default House;