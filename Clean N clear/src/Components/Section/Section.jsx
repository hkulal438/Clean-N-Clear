import "./Section.css";

import chemicalsImg from "../../images/cleaning-chemicals.png";
import toolsImg from "../../images/cleaning-tools.png";
import equipmentImg from "../../images/professional-equipment.png";

const categories = [
  {
    id: "chemicals",
    title: "Cleaning Chemicals",
    description:
      "High-quality cleaning solutions designed to help remove dirt, grease and germs and maintain clean, hygienic and fresh environments.",
    cta: "Explore Cleaning Chemicals",
    image: chemicalsImg,
  },
  {
    id: "tools",
    title: "Cleaning Tools",
    description:
      "Essential tools for efficient cleaning and maintenance, including mops, brushes, buckets, wipers and cleaning accessories.",
    cta: "Explore Cleaning Tools",
    image: toolsImg,
  },
  {
    id: "equipment",
    title: "Professional Cleaning Equipment",
    description:
      "Professional cleaning equipment for demanding cleaning requirements, including products supplied from Kärcher.",
    cta: "Explore Professional Equipment",
    image: equipmentImg,
  },
];

export default function Section() {
  return (
    <section className="clean-range-section" id="our-range">
      <div
        className="clean-range-glow clean-range-glow--left"
        aria-hidden="true"
      />

      <div
        className="clean-range-glow clean-range-glow--right"
        aria-hidden="true"
      />

      <div className="clean-range-inner">
        <header className="clean-range-header">
          <p className="clean-range-eyebrow">
            <span
              className="clean-range-eyebrow-line"
              aria-hidden="true"
            />

            Our Range

            <span
              className="clean-range-eyebrow-line"
              aria-hidden="true"
            />
          </p>

          <h2 className="clean-range-title">
            Essential products &amp; professional equipment,{" "}
            <em>brought together.</em>
          </h2>

          <p className="clean-range-intro">
            Clean N Clear brings together essential cleaning products and
            professional cleaning equipment to meet a wide range of cleaning
            and hygiene requirements.
          </p>
        </header>

        <div className="clean-range-grid">
          {categories.map((cat) => (
            <article className="clean-range-card" key={cat.id}>
              <div className="clean-range-media">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width="1024"
                  height="768"
                />

                {cat.badge ? (
                  <span className="clean-range-badge">
                    {cat.badge}
                  </span>
                ) : null}
              </div>

              <div className="clean-range-body">
                <span className="clean-range-index">
                  {cat.index}
                </span>

                <h3 className="clean-range-card-title">
                  {cat.title}
                </h3>

                <p className="clean-range-card-text">
                  {cat.description}
                </p>

                <a
                  className="clean-range-link"
                  href={`#${cat.id}`}
                >
                  {cat.cta}

                  <span
                    className="clean-range-arrow"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}