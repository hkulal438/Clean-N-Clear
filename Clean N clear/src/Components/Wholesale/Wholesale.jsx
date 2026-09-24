import React from "react";
import { Link } from "react-router-dom";
import "./Wholesale.css";

const supplyCategories = [
  {
    number: "01",
    title: "Cleaning Chemicals",
    description:
      "Cleaning chemicals for regular, commercial and larger-volume requirements.",
  },
  {
    number: "02",
    title: "Cleaning Tools",
    description:
      "Mops, brooms, brushes and other practical cleaning tools for professional use.",
  },
  {
    number: "03",
    title: "Professional Cleaning Equipment",
    description:
      "Professional cleaning machines and equipment for demanding cleaning operations.",
  },
];

const wholesaleCustomers = [
  {
    number: "01",
    title: "Businesses",
    description:
      "Cleaning products and equipment for offices, commercial spaces and business operations.",
  },
  {
    number: "02",
    title: "Institutions",
    description:
      "Cleaning supplies for educational, healthcare and other institutional environments.",
  },
  {
    number: "03",
    title: "Retailers",
    description:
      "Product supply options for retailers looking to stock cleaning and hygiene products.",
  },
  {
    number: "04",
    title: "Hospitality",
    description:
      "Cleaning solutions for hotels, restaurants and hospitality operations.",
  },
  {
    number: "05",
    title: "Facility Management",
    description:
      "Cleaning products and equipment for facility management and maintenance requirements.",
  },
];

const Wholesale = () => {
  return (
    <main className="cnc-wholesale-page">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="cnc-wholesale-hero">

        <div className="cnc-wholesale-hero-image"></div>

        <div className="cnc-wholesale-hero-overlay"></div>

        <div className="cnc-wholesale-hero-content">

          <span className="cnc-wholesale-eyebrow">
            CLEAN N CLEAR
          </span>

          <h1>
            WHOLESALE CLEANING SUPPLY
          </h1>

          <h2>
            Cleaning Products for Bulk Requirements
          </h2>

          <p>
            Talk to Clean N Clear about your larger-volume cleaning
            product and equipment requirements.
          </p>

          <div className="cnc-wholesale-hero-actions">

            <a
              href="#wholesale-enquiry"
              className="cnc-wholesale-btn cnc-wholesale-btn-primary"
            >
              Request Wholesale Quote
            </a>

            <Link
              to="/contact"
              className="cnc-wholesale-btn cnc-wholesale-btn-outline"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT WE SUPPLY
          ===================================================== */}

      <section className="cnc-wholesale-supply">

        <div className="cnc-wholesale-container">

          <div className="cnc-wholesale-section-heading">

            <span>
              WHAT WE SUPPLY
            </span>

            <h2>
              Cleaning Products for Larger Requirements
            </h2>

          </div>


          <div className="cnc-wholesale-supply-grid">

            {supplyCategories.map((category) => (

              <article
                className="cnc-wholesale-supply-card"
                key={category.number}
              >

                <div className="cnc-wholesale-card-top">

                  <span className="cnc-wholesale-number">
                    {category.number}
                  </span>

                  <span className="cnc-wholesale-card-line"></span>

                </div>

                <h3>
                  {category.title}
                </h3>

                <p>
                  {category.description}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHO IS WHOLESALE FOR
          ===================================================== */}

      <section className="cnc-wholesale-customers">

        <div className="cnc-wholesale-container">

          <div className="cnc-wholesale-section-heading">

            <span>
              WHO IS WHOLESALE FOR?
            </span>

            <h2>
              Supply for Professional Requirements
            </h2>

          </div>


          <div className="cnc-wholesale-customer-grid">

            {wholesaleCustomers.map((customer) => (

              <article
                className="cnc-wholesale-customer-card"
                key={customer.number}
              >

                <span className="cnc-wholesale-customer-number">
                  {customer.number}
                </span>

                <div>

                  <h3>
                    {customer.title}
                  </h3>

                  <p>
                    {customer.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BIG WHOLESALE ENQUIRY
          ===================================================== */}

      <section
        className="cnc-wholesale-enquiry"
        id="wholesale-enquiry"
      >

        <div className="cnc-wholesale-enquiry-container">

          <div className="cnc-wholesale-enquiry-intro">

            <span>
              WHOLESALE ENQUIRY
            </span>

            <h2>
              NEED A BULK REQUIREMENT?
            </h2>

            <p>
              Tell us what you need and our team can discuss the
              product, quantity and supply requirements with you.
            </p>

            <div className="cnc-wholesale-enquiry-note">

              <span>01</span>

              <p>
                Share your product or category requirement.
              </p>

            </div>

            <div className="cnc-wholesale-enquiry-note">

              <span>02</span>

              <p>
                Provide the approximate quantity required.
              </p>

            </div>

            <div className="cnc-wholesale-enquiry-note">

              <span>03</span>

              <p>
                Our team can contact you regarding the requirement.
              </p>

            </div>

          </div>


          <div className="cnc-wholesale-form-wrapper">

            <form
              className="cnc-wholesale-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you. Your wholesale enquiry has been submitted."
                );
              }}
            >

              <div className="cnc-wholesale-form-grid">

                <div className="cnc-wholesale-field">

                  <label htmlFor="wholesale-product">
                    Product / Category
                  </label>

                  <input
                    id="wholesale-product"
                    type="text"
                    name="product"
                    placeholder="Enter product or category"
                    required
                  />

                </div>


                <div className="cnc-wholesale-field">

                  <label htmlFor="wholesale-quantity">
                    Quantity
                  </label>

                  <input
                    id="wholesale-quantity"
                    type="text"
                    name="quantity"
                    placeholder="Required quantity"
                    required
                  />

                </div>


                <div className="cnc-wholesale-field">

                  <label htmlFor="wholesale-company">
                    Company Name
                  </label>

                  <input
                    id="wholesale-company"
                    type="text"
                    name="company"
                    placeholder="Company name"
                    required
                  />

                </div>


                <div className="cnc-wholesale-field">

                  <label htmlFor="wholesale-phone">
                    Phone
                  </label>

                  <input
                    id="wholesale-phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    required
                  />

                </div>


                <div className="cnc-wholesale-field cnc-wholesale-field-full">

                  <label htmlFor="wholesale-email">
                    Email
                  </label>

                  <input
                    id="wholesale-email"
                    type="email"
                    name="email"
                    placeholder="Business email address"
                    required
                  />

                </div>


                <div className="cnc-wholesale-field cnc-wholesale-field-full">

                  <label htmlFor="wholesale-message">
                    Message
                  </label>

                  <textarea
                    id="wholesale-message"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your requirement..."
                  ></textarea>

                </div>

              </div>


              <button
                type="submit"
                className="cnc-wholesale-submit"
              >
                REQUEST WHOLESALE QUOTE
                <span>→</span>
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
          ===================================================== */}

      <section className="cnc-wholesale-cta">

        <div className="cnc-wholesale-cta-inner">

          <div>

            <span>
              CLEAN N CLEAR
            </span>

            <h2>
              Request a Wholesale Enquiry
            </h2>

          </div>

          <a
            href="#wholesale-enquiry"
            className="cnc-wholesale-cta-button"
          >
            Request Wholesale Enquiry
          </a>

        </div>

      </section>

    </main>
  );
};

export default Wholesale;