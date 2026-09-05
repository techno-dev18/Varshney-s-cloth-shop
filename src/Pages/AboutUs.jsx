import React from "react";
import "../Styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">WELCOME TO OUR STORE</span>

          <h1>
            Fashion That Fits
            <br />
            <span>Your Lifestyle</span>
          </h1>

          <p>
            Welcome to Varshney's Cloth Shop — your destination for
            stylish, comfortable, and quality clothing for every occasion.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-intro">
        <div className="about-intro-image">
          <div className="about-image-placeholder">
            <span>Varshney's Cloth Shop</span>
          </div>
        </div>

        <div className="about-intro-content">
          <span className="section-label">WHO WE ARE</span>

          <h2>
            More Than Just
            <br />
            <span>Clothing</span>
          </h2>

          <p>
            Varshney's Cloth Shop is built around a simple idea:
            fashion should be stylish, comfortable, and accessible.
          </p>

          <p>
            We bring together carefully selected clothing collections
            designed to help you express your personal style. Whether
            you're looking for everyday essentials or something special
            for an occasion, we aim to make your shopping experience
            simple and enjoyable.
          </p>

          <p>
            From discovering your favorite products to placing an order,
            every part of our store is designed with our customers in mind.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-section-heading">
          <span className="section-label">WHAT WE BELIEVE</span>
          <h2>Our Values</h2>
          <p>
            The principles behind everything we do.
          </p>
        </div>

        <div className="values-grid">

          <div className="value-card">
            <div className="value-number">01</div>
            <h3>Quality</h3>
            <p>
              We believe good clothing starts with quality products
              and thoughtful selection.
            </p>
          </div>

          <div className="value-card">
            <div className="value-number">02</div>
            <h3>Style</h3>
            <p>
              We bring together modern styles and timeless choices
              for different personalities and occasions.
            </p>
          </div>

          <div className="value-card">
            <div className="value-number">03</div>
            <h3>Customer First</h3>
            <p>
              We focus on creating a smooth, simple, and enjoyable
              shopping experience for every customer.
            </p>
          </div>

          <div className="value-card">
            <div className="value-number">04</div>
            <h3>Trust</h3>
            <p>
              We believe long-term relationships are built through
              transparency, reliability, and service.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div>
          <span className="section-label">EXPLORE OUR COLLECTION</span>

          <h2>
            Find Something
            <br />
            <span>You Love.</span>
          </h2>

          <p>
            Discover our latest collection and find pieces that
            match your style.
          </p>
        </div>

        <a href="/collection" className="about-cta-button">
          Shop Collection
        </a>
      </section>

    </div>
  );
};

export default AboutUs;