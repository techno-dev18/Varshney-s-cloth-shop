import React, { useState } from "react";
import "../Styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailto = `mailto:support@varshneysclothshop.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    window.location.href = mailto;
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div>
          <span>GET IN TOUCH</span>

          <h1>
            We'd Love To
            <br />
            <strong>Hear From You.</strong>
          </h1>

          <p>
            Have a question about an order, product, or anything
            else? Send us an email and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">

        <div className="contact-info">

          <span className="contact-label">
            CONTACT US
          </span>

          <h2>
            How Can We
            <br />
            <span>Help?</span>
          </h2>

          <p>
            Whether you have a question about our products,
            your order, or need assistance with something else,
            feel free to contact us.
          </p>

          <div className="email-box">
            <div className="email-icon">
              @
            </div>

            <div>
              <small>Email Us</small>

              <a href="mailto:support@varshneysclothshop.com">
                support@varshneysclothshop.com
              </a>
            </div>
          </div>

          <p className="response-text">
            We aim to respond to customer enquiries as soon
            as possible.
          </p>

        </div>

        {/* Form */}
        <div className="contact-form-container">

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="subject">
                Subject
              </label>

              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What is your message about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>
  );
};

export default ContactUs;