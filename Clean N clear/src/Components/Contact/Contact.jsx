import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
  };

  return (
    <section className="cnc-contact-section">

      {/* Background Decorations */}
      <span className="cnc-contact-circle cnc-contact-circle-one"></span>
      <span className="cnc-contact-circle cnc-contact-circle-two"></span>

      <div className="cnc-contact-container">

        {/* =====================================================
            LEFT SIDE - CONTACT FORM
        ====================================================== */}

        <form
          className="cnc-contact-form"
          onSubmit={handleSubmit}
        >
          <div className="cnc-contact-form-card">

            <div className="cnc-contact-form-heading">

              <span className="cnc-contact-eyebrow">
                GET IN TOUCH
              </span>

              <h2>
                Let's Talk About Your
                <span> Cleaning Requirement</span>
              </h2>

              <p>
                Whether you need cleaning chemicals, tools,
                professional equipment or bulk supplies,
                we're here to help.
              </p>

            </div>


            {/* Form Fields */}

            <div className="cnc-contact-fields">

              {/* First Name */}
              <div className="cnc-contact-field">

                <label htmlFor="firstName">
                  FIRST NAME
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Please enter first name..."
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Email */}
              <div className="cnc-contact-field">

                <label htmlFor="email">
                  EMAIL
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Please enter email..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Phone */}
              <div className="cnc-contact-field">

                <label htmlFor="phoneNumber">
                  PHONE NUMBER
                </label>

                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Please enter phone number..."
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Message */}
              <div className="cnc-contact-field">

                <label htmlFor="message">
                  WHAT DO YOU HAVE IN MIND?
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Please enter your query..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Submit Button */}

            <button
              type="submit"
              className="cnc-contact-submit"
            >
              <span>Send Enquiry</span>

              <span className="cnc-contact-arrow">
                →
              </span>
            </button>

          </div>
        </form>


        {/* =====================================================
            RIGHT SIDE - CONTACT INFORMATION
        ====================================================== */}

        <div className="cnc-contact-details">

          {/* Heading */}

          <div className="cnc-contact-details-heading">

            <span className="cnc-contact-eyebrow">
              CONTACT US
            </span>

            <h2>
              Contact <span>Clean N Clear</span>
            </h2>

            <p>
              Have a question or looking for the right cleaning
              solution? Get in touch with our team today.
            </p>

          </div>


          {/* Address */}

          <div className="cnc-contact-info-card">

            <div className="cnc-contact-info-icon">
              📍
            </div>

            <div className="cnc-contact-info-content">

              <h4>
                Our Location
              </h4>

              <p>
                Shop No. 1 &amp; 2, Lower Ground, KRR Road,
                <br />
                Opp. Sympony Mahendra Arcade,
                <br />
                Near Radha Medical, PVS,
                <br />
                Mangaluru, Karnataka – 575003
              </p>

            </div>

          </div>


          {/* Phone */}

          <div className="cnc-contact-info-card">

            <div className="cnc-contact-info-icon">
              📞
            </div>

            <div className="cnc-contact-info-content">

              <h4>
                Call Us
              </h4>

              <p>
                +91 99013 84734
                <br />
                +91 81473 04734
              </p>

            </div>

          </div>


          {/* Email */}

          <div className="cnc-contact-info-card">

            <div className="cnc-contact-info-icon">
              ✉
            </div>

            <div className="cnc-contact-info-content">

              <h4>
                Email Us
              </h4>

              <p>
                cleannclear.ind@gmail.com
              </p>

            </div>

          </div>


          {/* Social Media */}

          <div className="cnc-contact-social">

            <a
              href="#"
              aria-label="Twitter"
            >
              <img
                src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                alt="Twitter"
              />
            </a>

            <a
              href="#"
              aria-label="Facebook"
            >
              <img
                src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                alt="Facebook"
              />
            </a>

            <a
              href="#"
              aria-label="Google"
            >
              <img
                src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                alt="Google"
              />
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              <img
                src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                alt="Instagram"
              />
            </a>

          </div>


          {/* =====================================================
              GOOGLE MAP
          ====================================================== */}

          <div className="cnc-contact-map">

            <iframe
              title="Clean N Clear Mangaluru Location"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3889.4857114849688!2d74.84286042483966!3d12.876459137430272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sShop%20No.%201%20%26%202%2C%20Lower%20Ground%2C%20KRR%20Road%2C%20Opp.%20Sympony%20Mahendra%20Arcade%2C%20Near%20Radha%20Medical%2C%20PVS%2C%20Mangaluru%2C%20Karnataka%20%E2%80%93%20575003!5e0!3m2!1sen!2sin!4v1789984160219!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>

          </div>

        </div>

      </div>
    </section>
  );
}