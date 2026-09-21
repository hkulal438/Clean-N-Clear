import React, { useState } from "react";
import "./Appointment.css";
import appointmentBg from "../../images/Karcher3.png";

const Appointment = ({
  bgImage = appointmentBg,
  tollFree = "18004253916",
  onSubmit,
}) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(form);
    } else {
      console.log("Appointment request:", form);
    }

    setForm({
      name: "",
      mobile: "",
      location: "",
    });
  };

  return (
    <section
      className="appointment"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="appointment__overlay"></div>

      <div className="appointment__inner">

        {/* LEFT CONTENT */}
        <div className="appointment__content">
          <h2 className="appointment__title">
            While choosing the land, choose the best one at Muliya Properties
          </h2>

          <a
            className="appointment__phone"
            href={`tel:${tollFree}`}
          >
            <svg
              className="appointment__phone-icon"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
              />
            </svg>

            <span>Toll Free : {tollFree}</span>
          </a>
        </div>

        {/* RIGHT FORM */}
        <form
          className="appointment__form"
          onSubmit={handleSubmit}
        >
          <input
            className="appointment__input"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <div className="appointment__row">
            <input
              className="appointment__input"
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
            />

            <input
              className="appointment__input"
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="appointment__button"
            type="submit"
          >
            Book an appointment
          </button>
        </form>

      </div>
    </section>
  );
};

export default Appointment;