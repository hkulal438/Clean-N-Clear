import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./Industries.css";

const cncIndustriesData = [
  {
    title: "HEALTHCARE & MEDICAL",
    heading: "Healthcare & Medical",
    description:
      "Reliable cleaning and hygiene solutions for hospitals, clinics and medical facilities.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "HOSPITALITY",
    heading: "Hospitality",
    description:
      "Professional cleaning products and equipment for hotels, resorts and hospitality spaces.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "EDUCATION",
    heading: "Educational Institutions",
    description:
      "Complete cleaning and hygiene solutions for schools, colleges and educational campuses.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "OFFICES & COMMERCIAL",
    heading: "Offices & Commercial",
    description:
      "Efficient cleaning solutions for offices, commercial buildings and professional workplaces.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "INDUSTRIAL & BUSINESS",
    heading: "Industrial & Business",
    description:
      "Heavy-duty cleaning products and professional equipment for demanding environments.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "RESIDENTIAL",
    heading: "Residential",
    description:
      "Practical cleaning and hygiene essentials for homes and everyday household requirements.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85",
  },
];

const Industries = () => {
  return (
    <section
      className="cnc-industries-section"
      id="industries"
    >

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="cnc-industries-heading">

        {/* PREMIUM LABEL */}

        <div className="cnc-industries-label">

          <span className="cnc-industries-label-line"></span>

          <span>INDUSTRIES</span>

          <span className="cnc-industries-label-line"></span>

        </div>


        {/* MAIN HEADING */}

        <div className="cnc-industries-title">

          <h2>
            Solutions for
            <span>Every Environment</span>
          </h2>

        </div>


        {/* DESCRIPTION */}

        <div className="cnc-industries-intro">

          <p>
            Clean N Clear provides dependable cleaning and hygiene
            solutions across healthcare, hospitality, education,
            commercial, industrial and residential environments.
          </p>

        </div>


        {/* MAIN CTA */}

        <a
          href="#contact"
          className="cnc-industries-main-link"
        >
          <span>Explore All Industries</span>

          <FaArrowRight />

        </a>

      </div>


      {/* =====================================================
          INDUSTRIES GRID
      ===================================================== */}

      <div className="cnc-industries-grid">

        {cncIndustriesData.map((industry) => (

          <article
            className="cnc-industries-card"
            key={industry.title}
          >

            {/* IMAGE */}

            <div className="cnc-industries-image">

              <img
                src={industry.image}
                alt={industry.heading}
              />

            </div>


            {/* TRANSPARENT BLUE OVERLAY */}

            <div className="cnc-industries-overlay"></div>


            {/* VERTICAL LABEL */}

            <div className="cnc-industries-side-label">

              <span>
                {industry.title}
              </span>

            </div>


            {/* CARD CONTENT */}

            <div className="cnc-industries-content">

              <h3>
                {industry.heading}
              </h3>

              <p>
                {industry.description}
              </p>

              <a
                href="#contact"
                className="cnc-industries-card-link"
              >

                <span>Explore</span>

                <FaArrowRight />

              </a>

            </div>


            {/* GREEN ACCENT */}

            <span className="cnc-industries-accent"></span>

          </article>

        ))}

      </div>

    </section>
  );
};

export default Industries;