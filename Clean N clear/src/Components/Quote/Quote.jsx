import React, { useState } from "react";
import "./Quote.css";

const Quote = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Cleaning Chemicals",
    "Cleaning Tools",
    "Professional Cleaning Equipment",
    "Kärcher Products",
    "Household Cleaning",
    "Commercial Cleaning",
    "Institutional Cleaning",
    "Retail Requirement",
    "Wholesale Requirement",
    "Other",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <main className="cnc-quote-page">

      <div className="cnc-quote-container">

        {/* =====================================================
            PAGE HEADING
        ===================================================== */}

        <header className="cnc-quote-title">

          <span className="cnc-quote-title-label">
            GET A QUOTE
          </span>

          <h1>Tell Us Your Cleaning Requirement</h1>

          <p>
            Looking for cleaning chemicals, cleaning tools or
            professional cleaning equipment? Share your requirement
            with Clean N Clear.
          </p>

        </header>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="cnc-quote-layout">

          {/* ===================================================
              QUOTE FORM
          =================================================== */}

          <section className="cnc-quote-form-card">

            <form onSubmit={handleSubmit}>

              {/* =================================================
                  YOUR DETAILS
              ================================================= */}

              <div className="cnc-quote-section">

                <div className="cnc-quote-section-title">

                  <div>
                    <h2>Your Details</h2>

                    <p>
                      Please provide your contact information.
                    </p>
                  </div>

                </div>


                <div className="cnc-quote-input-grid">

                  <div className="cnc-quote-field">

                    <label>
                      Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />

                  </div>


                  <div className="cnc-quote-field">

                    <label>
                      Company / Organisation
                    </label>

                    <input
                      type="text"
                      name="company"
                      placeholder="Enter company or organisation"
                    />

                  </div>


                  <div className="cnc-quote-field">

                    <label>
                      Phone Number <span>*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      required
                    />

                  </div>


                  <div className="cnc-quote-field">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                    />

                  </div>

                </div>

              </div>


              {/* =================================================
                  WHAT ARE YOU LOOKING FOR
              ================================================= */}

              <div className="cnc-quote-section">

                <div className="cnc-quote-section-title">

                  <div>
                    <h2>What Are You Looking For?</h2>

                    <p>
                      Select one or more options that match your requirement.
                    </p>
                  </div>

                </div>


                <div className="cnc-quote-category-grid">

                  {categories.map((category) => {

                    const selected =
                      selectedCategories.includes(category);

                    return (
                      <button
                        type="button"
                        key={category}
                        className={`cnc-quote-category ${
                          selected
                            ? "cnc-quote-category-active"
                            : ""
                        }`}
                        onClick={() =>
                          handleCategoryChange(category)
                        }
                        aria-pressed={selected}
                      >

                        <span className="cnc-quote-category-box">
                          {selected ? "✓" : ""}
                        </span>

                        <span className="cnc-quote-category-text">
                          {category}
                        </span>

                      </button>
                    );

                  })}

                </div>

              </div>


              {/* =================================================
                  YOUR REQUIREMENT
              ================================================= */}

              <div className="cnc-quote-section">

                <div className="cnc-quote-section-title">

                  <div>
                    <h2>Your Requirement</h2>

                    <p>
                      Give us some details about the products or
                      solution you need.
                    </p>
                  </div>

                </div>


                <div className="cnc-quote-requirement-fields">

                  <div className="cnc-quote-field">

                    <label>
                      Product / Requirement
                    </label>

                    <input
                      type="text"
                      name="product"
                      placeholder="Tell us which product or solution you are looking for"
                    />

                  </div>


                  <div className="cnc-quote-field">

                    <label>
                      Quantity / Approximate Requirement
                    </label>

                    <input
                      type="text"
                      name="quantity"
                      placeholder="Enter quantity if applicable"
                    />

                  </div>


                  <div className="cnc-quote-field">

                    <label>
                      Message
                    </label>

                    <textarea
                      name="message"
                      rows="6"
                      placeholder="Tell us more about your requirement"
                    ></textarea>

                  </div>

                </div>

              </div>


              <input
                type="hidden"
                name="categories"
                value={selectedCategories.join(", ")}
              />


              {/* =================================================
                  SUBMIT
              ================================================= */}

              <div className="cnc-quote-submit-area">

                <button
                  type="submit"
                  className="cnc-quote-submit-button"
                >
                  <span>REQUEST A QUOTE</span>

                  <b>→</b>
                </button>

                <p>
                  Our team will review your enquiry and contact you
                  regarding your requirement.
                </p>

              </div>


              {/* =================================================
                  SUCCESS MESSAGE
              ================================================= */}

              {submitted && (
                <div className="cnc-quote-success">
                  <span className="cnc-quote-success-icon">
                    ✓
                  </span>

                  <div>
                    <strong>Enquiry Submitted</strong>

                    <p>
                      Our team will review your enquiry and contact
                      you regarding your requirement.
                    </p>
                  </div>
                </div>
              )}

            </form>

          </section>


          {/* ===================================================
              DIRECT CONTACT
          =================================================== */}

          <aside className="cnc-quote-contact-card">

            <div className="cnc-quote-contact-heading">

              <span>DIRECT CONTACT</span>

              <h2>Prefer to Contact Us Directly?</h2>

            </div>


            <div className="cnc-quote-contact-item">

              <small>CALL US</small>

              <a href="tel:+919901384734">
                +91 99013 84734
              </a>

              <a href="tel:+918147304734">
                +91 81473 04734
              </a>

            </div>


            <div className="cnc-quote-contact-item">

              <small>EMAIL US</small>

              <a href="mailto:cleannclear.ind@gmail.com">
                cleannclear.ind@gmail.com
              </a>

            </div>


            <div className="cnc-quote-contact-item">

              <small>VISIT US</small>

              <p>
                Shop No. 1 &amp; 2, Lower Ground, KRR Road,
                <br />
                Opp. Sympony Mahendra Arcade,
                <br />
                Near Radha Medical, PVS,
                <br />
                Mangaluru, Karnataka 575003
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
};

export default Quote;