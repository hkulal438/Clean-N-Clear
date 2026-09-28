import React from "react";
import "./Solution.css";

const solutions = [
  {
    title: "Commercial",
    description:
      "Professional cleaning solutions for offices, businesses and commercial spaces.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=90",
    link: "/solutions/commercial",
  },
  {
    title: "Household",
    description:
      "Cleaning products and tools for everyday home requirements.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=90",
    link: "/solutions/household",
  },
  {
    title: "Institutional",
    description:
      "Complete cleaning solutions for schools, hospitals and larger facilities.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=90",
    link: "/solutions/institutional",
  },
  {
    title: "Retail",
    description:
      "Quality cleaning products for individual and everyday requirements.",
    image:
      "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1200&q=90",
    link: "/solutions/retail",
  },
  {
    title: "Wholesale",
    description:
      "Bulk supply for larger product and equipment requirements.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=90",
    link: "/solutions/wholesale",
  },
];

const Solution = () => {
  return (
    <section className="cnc-sol-section" id="solutions">
      <div className="cnc-sol-container">

        {/* SECTION HEADING */}
        <div className="cnc-sol-header">

          <div className="cnc-sol-eyebrow">
            SOLUTIONS
          </div>

          <h2 className="cnc-sol-heading">
            Cleaning Solutions
            <br />
            <span>for Every Requirement</span>
          </h2>

          <p className="cnc-sol-description">
            From everyday household cleaning to professional commercial and
            institutional requirements, Clean N Clear provides cleaning
            chemicals, tools and professional equipment for different
            cleaning needs.
          </p>

        </div>

        {/* SOLUTIONS */}
        <div className="cnc-sol-layout">

          {/* COMMERCIAL FEATURE */}
          <article className="cnc-sol-feature">
            <a
              href={solutions[0].link}
              className="cnc-sol-card-link"
            >
              <div className="cnc-sol-feature-image">

                <img
                  src={solutions[0].image}
                  alt="Commercial cleaning solutions"
                />

                <div className="cnc-sol-dark-overlay"></div>

                <div className="cnc-sol-feature-content">
                  <div className="cnc-sol-tag">
                    PROFESSIONAL
                  </div>

                  <h3>
                    Commercial
                  </h3>

                  <p>
                    {solutions[0].description}
                  </p>

                  <div className="cnc-sol-explore">
                    Explore solution
                  </div>
                </div>

              </div>
            </a>
          </article>

          {/* OTHER SOLUTIONS */}
          <div className="cnc-sol-side">

            {solutions.slice(1).map((solution) => (
              <article
                className="cnc-sol-small-card"
                key={solution.title}
              >
                <a
                  href={solution.link}
                  className="cnc-sol-card-link"
                >

                  <div className="cnc-sol-small-image">

                    <img
                      src={solution.image}
                      alt={`${solution.title} cleaning solutions`}
                    />

                    <div className="cnc-sol-small-overlay"></div>

                  </div>

                  <div className="cnc-sol-small-content">

                    <h3>
                      {solution.title}
                    </h3>

                    <p>
                      {solution.description}
                    </p>

                  </div>

                </a>
              </article>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Solution;