import "./About.css";
import aboutImg from "../../images/about-clean-n-clear.jpg";

function About() {
  return (
    <div className="responsive-container-block bigContainer">
      <div className="responsive-container-block Container bottomContainer">

        <div className="ultimateImg">
          <img
            className="mainImg"
            src={aboutImg}
            alt="Clean N Clear"
          />

          <div className="blueBox">
            <p className="blueText">
              Complete cleaning and hygiene solutions for
              commercial, household and institutional requirements.
            </p>

            <img
              className="stars"
              src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg"
              alt=""
            />
          </div>
        </div>

        <div className="allText bottomText">

          <p className="text-blk headingText">
            About Clean N Clear
          </p>

          <p className="text-blk subHeadingText">
            Your Total Hygiene Partner
          </p>

          <div className="description">

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
            className="explore"
          >
            View Products
          </a>

        </div>

      </div>
    </div>
  );
}

export default About;