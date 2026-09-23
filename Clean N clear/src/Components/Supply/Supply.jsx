
import aristoLogo from "../../images/Aristo.jpg";
import diverseyLogo from "../../images/Diversey.png";
import icleanLogo from "../../images/iClean.jpg";
import karcherLogo from "../../images/Karcher.png";
import taskiLogo from "../../images/taski.png";
import revachemLogo from "../../images/reva1.png";
import miracleanLogo from "../../images/miraclean.avif";

import "./Supply.css";

const authorizedPartners = [
  {
    image: karcherLogo,
    className: "karcher",
    link: "https://www.kaercher.com/in/",
  },
  {
    image: revachemLogo,
    className: "revachem",
    link: "https://www.revachem.co.in/",
  },
];

const suppliedBrands = [
  {
    name: "TASKI",
    image: taskiLogo,
    className: "taski",
    link: "https://taski.com/",
  },
  {
    name: "Diversey",
    image: diverseyLogo,
    className: "diversey",
    link: "https://diverseyvericlean.com/diversey-vericlean-system/products",
  },
  {
    name: "MiraClean",
    image: miracleanLogo,
    className: "miraclean",
    link: "https://miraclean.in/pages/know-more-page",
  },
  {
    name: "Aristo",
    image: aristoLogo,
    className: "aristo",
    link: "https://aristoplast.com/products/cleaning-products/25",
  },
  {
    name: "iClean",
    image: icleanLogo,
    className: "iclean",
    link: "https://icleans.in/",
  },
];

export default function Supply() {
  return (
    <section className="supply" aria-labelledby="supply-heading">
      <div className="supply__container">

        {/* Main Heading */}
        <div className="supply__heading">
          <span className="supply__line"></span>

          <h2 id="supply-heading">
            WE SUPPLY
          </h2>

          <span className="supply__line"></span>
        </div>

        <p className="supply__subtitle">
          Authorized distribution and trusted professional cleaning brands
        </p>


        {/* Authorized Partners */}
        <div className="supply__group">

          <div className="supply__group-heading">
            <span className="supply__group-line"></span>

            <h3>AUTHORIZED PARTNERS</h3>

            <span className="supply__group-line"></span>
          </div>

          <div className="supply__authorized">

            {authorizedPartners.map((partner, index) => (
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`supply__authorized-card supply__authorized-card--${partner.className}`}
                style={{ "--brand-index": index }}
                key={partner.name}
                aria-label={`Visit ${partner.name} website`}
              >
                <div className="supply__authorized-logo">
                  <img
                    src={partner.image}
                    alt={`${partner.name} logo`}
                  />
                </div>

                <div className="supply__authorized-name">
                  {partner.name}
                </div>
              </a>
            ))}

          </div>
        </div>


        {/* Brands We Supply */}
        <div className="supply__group supply__group--brands">

          <div className="supply__group-heading">
            <span className="supply__group-line"></span>

            <h3>BRANDS WE SUPPLY</h3>

            <span className="supply__group-line"></span>
          </div>

          <p className="supply__group-description">
            A carefully selected range of professional cleaning products
            and solutions from trusted industry brands.
          </p>

          <div className="supply__brands">

            {suppliedBrands.map((brand, index) => (
              <a
                href={brand.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`supply__brand supply__brand--${brand.className}`}
                style={{ "--brand-index": index }}
                key={brand.name}
                aria-label={`Visit ${brand.name} website`}
              >
                <img
                  src={brand.image}
                  alt={`${brand.name} logo`}
                />
              </a>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
