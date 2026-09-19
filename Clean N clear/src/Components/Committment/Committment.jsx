import "./Committment.css";

const commitments = [
  {
    id: "01",
    title: "Quality Products",
    description: "Providing quality cleaning products and solutions.",
  },
  {
    id: "02",
    title: "Practical Solutions",
    description:
      "Helping customers identify products suitable for their cleaning requirements.",
  },
  {
    id: "03",
    title: "Multiple Brands",
    description: "Offering products from a range of cleaning and hygiene brands.",
  },
  {
    id: "04",
    title: "Professional Equipment",
    description:
      "Providing access to professional cleaning technology from Kärcher.",
  },
];

export default function Commitment() {
  return (
    <section className="commitment" id="commitment">
      {/* Ambient background shapes */}
      <div className="commitment__glow commitment__glow--blue" aria-hidden="true" />
      <div className="commitment__glow commitment__glow--lime" aria-hidden="true" />

      <div className="commitment__inner">
        <div className="commitment__header">
          <span className="commitment__eyebrow">
            <span className="commitment__eyebrow-dot" aria-hidden="true" />
            Why choose us
          </span>
          <h2 className="commitment__title">
            Our <span className="commitment__title-accent">Commitment</span>
            <span className="commitment__title-dot" aria-hidden="true">
              .
            </span>
          </h2>
          <p className="commitment__subtitle">
            Four promises that guide everything we deliver — from the products
            we stock to the technology we stand behind.
          </p>
        </div>

        <div className="commitment__grid">
          {commitments.map((item, index) => (
            <article
              className="commitment__card"
              key={item.id}
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <div className="commitment__card-top">
                <span className="commitment__number">{item.id}</span>
                <span className="commitment__card-line" aria-hidden="true" />
              </div>
              <h3 className="commitment__card-title">{item.title}</h3>
              <p className="commitment__card-description">{item.description}</p>
              <span className="commitment__card-arrow" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
