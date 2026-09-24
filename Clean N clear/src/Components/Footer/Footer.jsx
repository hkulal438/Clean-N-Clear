import React from "react";
import "./Footer.css";

import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    if (!email) return;

    alert("Thank you for subscribing!");
    e.target.reset();
  };

  return (
    <footer className="footer">

      <div className="footer-overlay"></div>

      <div className="footer-container">

        {/* =====================================================
            TOP FOOTER
        ===================================================== */}

        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-column footer-brand">

            <h3>CLEAN N CLEAR</h3>

            <p className="brand-tagline">
              Your Total Hygiene Partner
            </p>

            <p className="brand-description">
              Cleaning Chemicals <span>•</span> Cleaning Tools
              <br />
              Professional Cleaning Equipment
            </p>

          </div>


          {/* QUICK LINKS */}
          <div className="footer-column">

            <h3>Quick Links</h3>

            <ul>
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>

              <li>
                <a href="/about" className="footer-link">
                  About Us
                </a>
              </li>

              <li>
                <a href="/products" className="footer-link">
                  Products
                </a>
              </li>

              <li>
                <a href="/solutions" className="footer-link">
                  Solutions
                </a>
              </li>

              <li>
                <a href="/industries" className="footer-link">
                  Industries
                </a>
              </li>

              <li>
                <a href="/contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>

          </div>


          {/* PRODUCTS */}
          <div className="footer-column">

            <h3>Products</h3>

            <ul>

              <li>
                <a href="/products/chemicals" className="footer-link">
                  Cleaning Chemicals
                </a>
              </li>

              <li>
                <a href="/products/tools" className="footer-link">
                  Cleaning Tools
                </a>
              </li>

              <li>
                <a href="/products/equipment" className="footer-link">
                  Professional Equipment
                </a>
              </li>

              <li>
                <a href="/products/hygiene" className="footer-link">
                  Hygiene Supplies
                </a>
              </li>

              <li>
                <a href="/products/household" className="footer-link">
                  Household Products
                </a>
              </li>

              <li>
                <a href="/products/commercial" className="footer-link">
                  Commercial Supplies
                </a>
              </li>

            </ul>

          </div>


          {/* CONTACT */}
          <div className="footer-column footer-contact">

            <h3>Contact</h3>

            <p className="contact-address">
              Shop No. 1 &amp; 2, Lower Ground, KRR Road,
              <br />
              Opp. Symphony Mahendra Arcade,
              <br />
              Near Radha Medical, PVS,
              <br />
              Mangaluru, Karnataka – 575003
            </p>

            <div className="contact-details">

              <a href="tel:+919901384734">
                <FaPhone />
                +91 99013 84734
              </a>

              <a href="tel:+918147304734">
                <FaPhone />
                +91 81473 04734
              </a>

              <a href="mailto:cleannclear.ind@gmail.com">
                <FaEnvelope />
                cleannclear.ind@gmail.com
              </a>

              <a
                href="https://wa.me/919901384734"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            SOCIAL + CTA
        ===================================================== */}

        <div className="footer-cta">

          <div className="cta-left">

            <h2>
              Keep Your Space
              <br />
              Clean &amp; Hygienic.
            </h2>

            <p>
              Stay updated with cleaning solutions,
              products and hygiene tips.
            </p>

          </div>


          <div className="cta-right">

            <form onSubmit={handleSubscribe}>

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />

              <button type="submit">
                SUBSCRIBE FOR FREE
              </button>

            </form>

          </div>

        </div>


        {/* =====================================================
            SOCIAL
        ===================================================== */}

        <div className="footer-social">

          <p>Follow Clean N Clear</p>

          <div className="social-icons">

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

          </div>

        </div>


        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="footer-bottom">

          <p>
            Copyright © 2026 |{" "}
            <span>CLEAN N CLEAR</span>
          </p>

          <div className="bottom-links">

            <a href="/privacy-policy">
              Privacy Policy
            </a>

            <a href="/terms-and-conditions">
              Terms &amp; Conditions
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;