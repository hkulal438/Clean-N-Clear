
import "./Footer.css";

import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa6";

import logo from "../../images/CLEANNCLEAR_LOGO-05.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cnc-footer">
      {/* Background Overlay */}
      <div className="cnc-footer-overlay"></div>

      <div className="cnc-footer-container">
        {/* MAIN FOOTER */}
        <div className="cnc-footer-grid">

          {/* BRAND */}
          <div className="cnc-footer-column cnc-footer-brand">
            <a
              href="/"
              className="cnc-footer-logo-link"
              aria-label="Clean N Clear Home"
            >
              <img
                src={logo}
                alt="Clean N Clear"
                className="cnc-footer-logo"
              />
            </a>

            <p className="cnc-footer-gst">
              GST No.: <strong>29BQHPC0753Q1ZF</strong>
            </p>

            <p className="cnc-footer-tagline">
              Your Total Hygiene Partner
            </p>

            <p className="cnc-footer-description">
              Cleaning Chemicals <span>•</span> Cleaning Tools
              <br />
              Professional Cleaning Equipment
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="cnc-footer-column cnc-footer-links-column">
            <h3>Quick Links</h3>

            <ul>
              <li><a href="/" className="cnc-footer-link">Home</a></li>
              <li><a href="/about-us" className="cnc-footer-link">About Us</a></li>
              <li><a href="/products" className="cnc-footer-link">Products</a></li>
              <li><a href="/solutions" className="cnc-footer-link">Solutions</a></li>
              <li><a href="/industries" className="cnc-footer-link">Industries</a></li>
              <li><a href="/contact" className="cnc-footer-link">Contact</a></li>
              <li><a href="/catalogues" className="cnc-footer-link">Catalogues</a></li>
            </ul>
          </div>

          {/* PRODUCTS */}
          <div className="cnc-footer-column cnc-footer-products-column">
            <h3>Products</h3>

            <ul>
              <li><a href="/products/cleaning-chemicals" className="cnc-footer-link">Cleaning Chemicals</a></li>
              <li><a href="/products/tools" className="cnc-footer-link">Cleaning Tools</a></li>
              <li><a href="/products/equipment" className="cnc-footer-link">Professional Equipment</a></li>
              <li><a href="/products/hygiene" className="cnc-footer-link">Hygiene Supplies</a></li>
              <li><a href="/products/household" className="cnc-footer-link">Household Products</a></li>
              <li><a href="/products/commercial" className="cnc-footer-link">Commercial Supplies</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="cnc-footer-column cnc-footer-contact">
            <h3>Contact</h3>

            <p className="cnc-footer-address">
              Shop No. 1 &amp; 2, Lower Ground, KRR Road,
              <br />
              Opp. Symphony Mahendra Arcade,
              <br />
              Near Radha Medical, PVS,
              <br />
              Mangaluru, Karnataka – 575003
            </p>

            <div className="cnc-footer-contact-details">
              <a href="tel:+919901384734" className="cnc-footer-contact-link">
                <FaPhone />
                <span>+91 99013 84734</span>
              </a>

              <a href="tel:+918147304734" className="cnc-footer-contact-link">
                <FaPhone />
                <span>+91 81473 04734</span>
              </a>

              <a href="mailto:cleannclear.ind@gmail.com" className="cnc-footer-contact-link">
                <FaEnvelope />
                <span>cleannclear.ind@gmail.com</span>
              </a>

              <a
                href="https://wa.me/919901384734"
                target="_blank"
                rel="noopener noreferrer"
                className="cnc-footer-contact-link"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="cnc-footer-social">
          <p>Follow Clean N Clear</p>

          <div className="cnc-footer-social-icons">
            <a
              href="https://www.instagram.com/clean_n_clear_official?cplk=azljN2JxMmdpNmJj&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Clean N Clear on Instagram"
              className="cnc-footer-social-link"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="cnc-footer-bottom">
          <p className="cnc-footer-copyright">
            Copyright © {currentYear} | <span>Clean N Clear</span>
          </p>

          <div className="cnc-footer-bottom-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
