
import React from "react";
import { motion } from "framer-motion";
import {
  FaHotel,
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
import hospitalityImage from "../../images/Hospitality.jpg";

const h6InfoList = [
  "Cleaning and hygiene solutions for hotels, resorts, restaurants and hospitality facilities.",
  "Professional cleaning products for guest rooms, public areas and service spaces.",
  "Cleaning chemicals, tools and equipment for regular cleaning and maintenance requirements.",
  "Hygiene supplies to support clean, fresh and well-maintained hospitality environments.",
];

const h6HealthcareItems = [
  { title: "Hotels & Resorts", icon: <FaHotel /> },
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

const Hospitality = () => {
  return (
    <section className="h6-wrap">

      {/* =====================================================
          TITLE
          ===================================================== */}

      <motion.h1
        className="h6-title"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        HOSPITALITY
      </motion.h1>


      {/* =====================================================
          IMAGE
          ===================================================== */}

      <motion.div
        className="h6-image-wrap"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        <img
          src={hospitalityImage}
          alt="Clean N Clear Hospitality Cleaning Solutions"
          className="h6-image"
        />
      </motion.div>


      {/* =====================================================
          CTA BUTTON
          ===================================================== */}

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


      {/* =====================================================
          DESCRIPTION
          ===================================================== */}

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
          for hotels, resorts, restaurants and other hospitality
          environments, where cleanliness and presentation are
          important for maintaining welcoming spaces.
        </p>

        <p>
          Our product offering includes cleaning chemicals,
          cleaning tools, professional cleaning equipment and
          hygiene supplies to support guest rooms, public areas,
          kitchens, washrooms and other hospitality cleaning
          requirements.
        </p>

        <p>
          We work with multiple cleaning and hygiene brands to
          provide suitable product options for different
          hospitality cleaning needs. Professional cleaning
          technology from Kärcher also forms an important part
          of our equipment offering.
        </p>
      </motion.div>


      {/* =====================================================
          INFORMATION LIST
          ===================================================== */}

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


      {/* =====================================================
          HOSPITALITY SOLUTIONS
          ===================================================== */}

      <motion.section
        className="h6-amenities"
        variants={h6FadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={6}
      >
        <h2 className="h6-amenities-title">
          HOSPITALITY CLEANING SOLUTIONS
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

export default Hospitality;
