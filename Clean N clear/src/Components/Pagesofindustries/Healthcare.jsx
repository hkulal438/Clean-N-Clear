
import React from "react";
import { motion } from "framer-motion";
import {
  FaHospital,
  FaFlask,
  FaBroom,
  FaTools,
  FaHandSparkles,
  FaPumpSoap,
  FaWater,
  FaToilet,
  FaClipboardCheck,
  FaCogs,
} from "react-icons/fa";

import "./Healthcare.css";
import healthcareImage from "../../images/Healthcare.png";

const h6InfoList = [
  "Cleaning and hygiene solutions for hospitals, clinics and healthcare facilities.",
  "Professional cleaning products for different healthcare cleaning requirements.",
  "Cleaning chemicals, tools and equipment for regular cleaning and maintenance.",
  "Hygiene supplies to support clean and well-maintained healthcare environments.",
];

const h6HealthcareItems = [
  {
    title: "Healthcare Facilities",
    icon: <FaHospital />,
  },
  {
    title: "Cleaning Chemicals",
    icon: <FaFlask />,
  },
  {
    title: "Cleaning Tools",
    icon: <FaBroom />,
  },
  {
    title: "Professional Equipment",
    icon: <FaTools />,
  },
  {
    title: "Hygiene Supplies",
    icon: <FaHandSparkles />,
  },
  {
    title: "Surface Cleaning",
    icon: <FaPumpSoap />,
  },
  {
    title: "Floor Care",
    icon: <FaWater />,
  },
  {
    title: "Washroom Hygiene",
    icon: <FaToilet />,
  },
  {
    title: "Routine Maintenance",
    icon: <FaClipboardCheck />,
  },
  {
    title: "Kärcher Solutions",
    icon: <FaCogs />,
  },
];

const h6FadeInUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  }),
};

const Healthcare = () => {
  return (
    <section className="h6-wrap">

      <motion.h1
        className="h6-title"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        HEALTHCARE
      </motion.h1>

      <motion.div
        className="h6-image-wrap"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        <img
          src={healthcareImage}
          alt="Clean N Clear Healthcare Cleaning Solutions"
          className="h6-image"
        />
      </motion.div>

      <motion.div
        className="h6-btn-wrap"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      >
        <a href="/contact" className="h6-book-btn">
          ENQUIRE NOW
        </a>
      </motion.div>

      <motion.div
        className="h6-description"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
      >
        <p>
          Clean N Clear provides comprehensive cleaning and hygiene
          solutions for healthcare environments, where cleanliness
          and hygiene are essential for maintaining safe and
          well-maintained spaces.
        </p>

        <p>
          Our product offering includes cleaning chemicals, cleaning
          tools, professional cleaning equipment and hygiene supplies
          to support the different cleaning and maintenance
          requirements of healthcare facilities.
        </p>

        <p>
          We work with multiple cleaning and hygiene brands to provide
          suitable product options for hospitals, clinics and other
          healthcare environments. Professional cleaning technology
          from Kärcher also forms an important part of our equipment
          offering.
        </p>
      </motion.div>

      <motion.ul
        className="h6-list"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={5}
      >
        {h6InfoList.map((item, index) => (
          <li key={index}>
            <span className="h6-check">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </motion.ul>

      <motion.section
        className="h6-amenities"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={6}
      >
        <h2 className="h6-amenities-title">
          HEALTHCARE CLEANING SOLUTIONS
        </h2>

        <div className="h6-icons-grid">
          {h6HealthcareItems.map((item, index) => (
            <motion.div
              className="h6-icon-item"
              key={item.title}
              variants={h6FadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 1}
            >
              <div className="h6-icon">
                {item.icon}
              </div>

              <span className="h6-label">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </section>
  );
};

export default Healthcare;

