import "./Client.css";

import brightLogo from "../../images/bright.png";
import faltherMullarLogo from "../../images/Falther mullar.png";
import goldLogo from "../../images/gold.png";
import indianaLogo from "../../images/indiana.png";
import paintLogo from "../../images/paint.png";
import shreeDeviLogo from "../../images/shree devi.jpg";
import stLogo from "../../images/st.jpg";
import unifycxLogo from "../../images/unifycx.jpg";
import winmanLogo from "../../images/winman.png";

const clients = [
  {
    name: "Bright",
    image: brightLogo,
  },
  {
    name: "Falther Mullar",
    image: faltherMullarLogo,
  },
  {
    name: "Gold",
    image: goldLogo,
  },
  {
    name: "Indiana",
    image: indianaLogo,
  },
  {
    name: "Paint",
    image: paintLogo,
  },
  {
    name: "Shree Devi",
    image: shreeDeviLogo,
  },
  {
    name: "ST",
    image: stLogo,
  },
  {
    name: "UnifyCX",
    image: unifycxLogo,
  },
  {
    name: "Winman",
    image: winmanLogo,
  },
];

export default function Client() {
  return (
    <section className="client" aria-labelledby="client-heading">

      <div className="client__container">

        {/* Section Heading */}
        <div className="client__heading">
          <span className="client__line"></span>

          <h2 id="client-heading">
            TRUSTED BY BUSINESSES &amp; INSTITUTIONS
          </h2>

          <span className="client__line"></span>
        </div>

        {/* Subtitle */}
        <p className="client__subtitle">
          Trusted by organisations across Mangaluru and beyond
        </p>


        {/* Client Logos */}
        <div className="client__grid">

          {clients.map((client, index) => (
            <div
              className="client__card"
              style={{ "--client-index": index }}
              key={client.name}
            >
              <img
                src={client.image}
                alt={`${client.name} logo`}
                className="client__logo"
              />
            </div>
          ))}

        </div>


        {/* CTA */}
        <div className="client__cta">

          <div className="client__cta-content">

            <h3>Want to work with us?</h3>

            <p>
              Let Clean N Clear help you create cleaner,
              safer and more efficient spaces.
            </p>

          </div>

          <a href="#contact" className="client__button">
            Contact Clean N Clear
            <span>→</span>
          </a>

        </div>

      </div>

    </section>
  );
}