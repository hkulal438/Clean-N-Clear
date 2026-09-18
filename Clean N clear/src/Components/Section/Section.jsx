import "./Section.css";
import chemicalsImg from "../../images/cleaning-chemicals.jpg";
import toolsImg from "../../images/cleaning-tools.jpg";
import equipmentImg from "../../images/professional-equipment.jpg";


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
    <section className="cnc-section" id="our-range">
      <div className="cnc-section__glow cnc-section__glow--left" aria-hidden="true" />
      <div className="cnc-section__glow cnc-section__glow--right" aria-hidden="true" />

      <div className="cnc-section__inner">
        <header className="cnc-section__header">
          <p className="cnc-section__eyebrow">
            <span className="cnc-section__eyebrow-line" aria-hidden="true" />
            Our Range
            <span className="cnc-section__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 className="cnc-section__title">
            Essential products &amp; professional equipment,{" "}
            <em>brought together.</em>
          </h2>
          <p className="cnc-section__intro">
            Clean N Clear brings together essential cleaning products and
            professional cleaning equipment to meet a wide range of cleaning
            and hygiene requirements.
          </p>
        </header>

        <div className="cnc-section__grid">
          {categories.map((cat) => (
            <article className="cnc-card" key={cat.id}>
              <div className="cnc-card__media">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width="1024"
                  height="768"
                />
                {cat.badge ? (
                  <span className="cnc-card__badge">{cat.badge}</span>
                ) : null}
              </div>
              <div className="cnc-card__body">
                <span className="cnc-card__index">{cat.index}</span>
                <h3 className="cnc-card__title">{cat.title}</h3>
                <p className="cnc-card__text">{cat.description}</p>
                <a className="cnc-card__link" href={`#${cat.id}`}>
                  {cat.cta}
                  <span className="cnc-card__arrow" aria-hidden="true">
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
