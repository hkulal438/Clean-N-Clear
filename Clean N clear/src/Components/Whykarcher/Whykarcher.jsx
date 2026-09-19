import React from "react";
import {
  FaBroom,
  FaWater,
  FaRegSnowflake,
  FaTools,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import "./Whykarcher.css";

const WhyKarcher = () => {
  const features = [
    {
      icon: <FaBroom />,
      title: "Floor Cleaning",
      text: "Professional floor cleaning solutions designed for efficient cleaning, maintenance and excellent results.",
    },
    {
      icon: <FaWater />,
      title: "High-Pressure Cleaning",
      text: "Powerful high-pressure cleaning equipment for removing tough dirt, grease and stubborn deposits.",
    },
    {
      icon: <FaRegSnowflake />,
      title: "Vacuum Cleaning",
      text: "Reliable vacuum cleaning solutions for effective removal of dust, dirt and debris across different environments.",
    },
    {
      icon: <FaTools />,
      title: "Professional Equipment",
      text: "A wide range of professional cleaning machines and equipment for demanding commercial applications.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Cleaning Technology",
      text: "Innovative cleaning technology developed to make professional cleaning more efficient and practical.",
    },
    {
      icon: <FaArrowRight />,
      title: "Right Equipment",
      text: "Get guidance from our team to identify the appropriate Kärcher equipment for your specific cleaning requirement.",
    },
  ];

  return (
    <section className="why-karcher">
      <div className="why-karcher-container">

        {/* Heading */}
        <div className="why-karcher-head">
          <h2>
            <span>Why</span> Kärcher?
          </h2>

          <p>
            Kärcher is presented in Clean N Clear's existing marketing
            material as a global leader in cleaning technology, offering
            professional solutions for a wide range of cleaning requirements.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="why-karcher-grid">
          {features.map((feature, index) => (
            <div className="karcher-item" key={index}>

              <div className="karcher-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

            </div>
          ))}
        </div>

        {/* Enquiry Section */}
        <div className="karcher-enquiry">
          <div className="karcher-enquiry-content">
            <h2>Looking for the Right Kärcher Equipment?</h2>

            <p>
              Tell us about your cleaning requirement and our team can help
              you identify the appropriate product.
            </p>
          </div>

          <a href="/contact" className="karcher-btn">
            Enquire Now
            <FaArrowRight />
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyKarcher;