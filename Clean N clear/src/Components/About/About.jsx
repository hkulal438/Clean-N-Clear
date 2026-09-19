import "./About.css";
import aboutImg from "../../images/about-clean-n-clear.jpg";

function About() {
  return (
    <div className="cnc-about-section">
      <div className="cnc-about-container cnc-about-bottom-container">

        <div className="cnc-about-image-wrapper">
          <img
            className="cnc-about-main-image"
            src={aboutImg}
            alt="Clean N Clear"
          />

          <div className="cnc-about-blue-box">
            <p className="cnc-about-blue-text">
              Complete cleaning and hygiene solutions for
              commercial, household and institutional requirements.
            </p>

            <img
              className="cnc-about-stars"
              src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg"
              alt=""
            />
          </div>
        </div>

        <div className="cnc-about-content">

          <p className="cnc-about-label">
            About Clean N Clear
          </p>

          <p className="cnc-about-heading">
            Your Total Hygiene Partner
          </p>

          <div className="cnc-about-description">

            <p>
              Clean N Clear is a cleaning products and solutions provider
              serving <strong>commercial, household and institutional</strong>
              cleaning requirements.
            </p>

            <p>
              Our product offering includes{" "}
              <strong>
                cleaning chemicals, cleaning tools and professional
                cleaning equipment
              </strong>
              , with professional cleaning technology from Kärcher forming
              an important part of our equipment offering.
            </p>

            <p>
              We work with multiple cleaning and hygiene brands to provide
              customers with product options suited to different cleaning
              requirements.
            </p>

          </div>

          <a
            href="/products"
            className="cnc-about-button"
          >
            View Products
          </a>

        </div>

      </div>
    </div>
  );
}

export default About;