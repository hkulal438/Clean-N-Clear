
import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
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
import officeImage from "../../images/Office.jpg";

const h6InfoList = [
  "Cleaning and hygiene solutions for offices, commercial spaces and workplaces.",
  "Professional cleaning products for workspaces, common areas and high-traffic spaces.",
  "Cleaning chemicals, tools and equipment for regular cleaning and maintenance requirements.",
  "Hygiene supplies to support clean, professional and well-maintained office environments.",
];

const h6OfficeItems = [
  { title: "Offices & Workspaces", icon: <FaBuilding /> },
  { title: "Cleaning Chemicals", icon: <FaFlask /> },
  { title: "Cleaning Tools", icon: <FaBroom /> },
  { title: "Professional Equipment", icon: <FaTools /> },
  { title: "Hygiene Supplies", icon: <FaHandSparkles /> },
  { title: "Surface Cleaning", icon: <FaPumpSoap /> },
  { title: "Floor Care", icon: <FaWater /> },
  { title: "Washroom Hygiene", icon: <FaToilet /> },
  { title: "Routine Maintenance", icon: <FaClipboardCheck /> },
  { title: "Kärcher Solutions", icon: <FaCogs /> },
];

const h6FadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  }),
};

const Office = () => {
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
        OFFICES &amp; COMMERCIAL
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
          src={officeImage}
          alt="Clean N Clear Office and Commercial Cleaning Solutions"
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
          Clean N Clear provides cleaning and hygiene solutions
          for offices, commercial spaces and workplaces, helping
          maintain clean, organised and professional environments.
        </p>

        <p>
          Our product offering includes cleaning chemicals,
          cleaning tools, professional cleaning equipment and
          hygiene supplies for workspaces, reception areas,
          meeting rooms, common areas, washrooms and other
          commercial cleaning requirements.
        </p>

        <p>
          We work with multiple cleaning and hygiene brands to
          provide suitable product options for different office
          and commercial cleaning needs. Professional cleaning
          technology from Kärcher also forms an important part
          of our equipment offering.
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
          OFFICE &amp; COMMERCIAL CLEANING SOLUTIONS
        </h2>

        <div className="h6-icons-grid">
          {h6OfficeItems.map((item, index) => (
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

export default Office;
