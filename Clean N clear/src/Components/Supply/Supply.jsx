import aristoLogo from "../../images/Aristo.jpg";
import diverseyLogo from "../../images/Diversey.png";
import icleanLogo from "../../images/iClean.jpg";
import karcherLogo from "../../images/Karcher.png";
import taskiLogo from "../../images/taski.png";
import revachemLogo from "../../images/reva1.png";

import "./Supply.css";

const suppliers = [
  {
    name: "Kärcher",
    image: karcherLogo,
    className: "karcher",
  },
  {
    name: "Revachem",
    image: revachemLogo,
    className: "revachem",
  },
  {
    name: "iClean",
    image: icleanLogo,
    className: "iclean",
  },
  {
    name: "TASKI",
    image: taskiLogo,
    className: "taski",
  },
  {
    name: "Aristo",
    image: aristoLogo,
    className: "aristo",
  },
  {
    name: "Diversey",
    image: diverseyLogo,
    className: "diversey",
  },
];

export default function Supply() {
  return (
    <section className="supply" aria-labelledby="supply-heading">
      <div className="supply__container">

        {/* Section Heading */}
        <div className="supply__heading">
          <span className="supply__line"></span>

          <h2 id="supply-heading">WE SUPPLY</h2>

          <span className="supply__line"></span>
        </div>

        <p className="supply__subtitle">
          Trusted brands for professional cleaning solutions
        </p>

        {/* Supplier Logos */}
        <div className="supply__logos">
          {suppliers.map((supplier, index) => (
            <div
              className="supply__brand"
              style={{ "--brand-index": index }}
              key={supplier.name}
            >
              <img
                className={`supply__logo supply__logo--${supplier.className}`}
                src={supplier.image}
                alt={`${supplier.name} logo`}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}