import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

import "../Styles/FooterBar.css";

const FooterBar = () => {

  return (
    <footer className="footer">

      {/* =========================
          TOP FOOTER
      ========================== */}

      <div className="footerContainer">

        {/* BRAND */}

        <div className="footerColumn brandColumn">

          <h2>
            Varshney's
          </h2>

          <h3>
            Cloth Shop
          </h3>

          <p>
            Discover stylish, comfortable and
            premium clothing for every occasion.
          </p>

          <p>
            Quality fashion, made for you.
          </p>

          {/* SOCIAL MEDIA */}

          <div className="socialLinks">

            <a
              href="#"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>

          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="footerColumn">

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/collection">
            Collection
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/basket">
            Basket
          </Link>

          <Link to="/account">
            My Account
          </Link>

        </div>


        {/* COLLECTION */}

        <div className="footerColumn">

          <h3>
            Collections
          </h3>

          <Link to="/collection/Shirts">
            Shirts
          </Link>

          <Link to="/collection/Jeans">
            Jeans
          </Link>

          <Link to="/collection/Jackets">
            Jackets
          </Link>

          <Link to="/collection/T-Shirts">
            T-Shirts
          </Link>

          <Link to="/collection/Dresses">
            Dresses
          </Link>

        </div>


        {/* CUSTOMER SERVICE */}

        <div className="footerColumn">

          <h3>
            Customer Service
          </h3>

          <Link to="#">
            Contact Us
          </Link>

          <Link to="#">
            Shipping & Delivery
          </Link>

          <Link to="#">
            Returns & Refunds
          </Link>

          <Link to="#">
            Privacy Policy
          </Link>

          <Link to="#">
            Terms & Conditions
          </Link>

        </div>


        {/* CONTACT */}

        <div className="footerColumn contactColumn">

          <h3>
            Contact Us
          </h3>

          <p>
            <FaMapMarkerAlt />

            India
          </p>

          <p>
            <FaPhone />

            +91 XXXXX XXXXX
          </p>

          <p>
            <FaEnvelope />

            support@varshneysclothshop.com
          </p>

        </div>

      </div>


      {/* =========================
          NEWSLETTER
      ========================== */}

      <div className="newsletter">

        <div>

          <h3>
            Stay Updated
          </h3>

          <p>
            Subscribe for new arrivals,
            exclusive offers and fashion updates.
          </p>

        </div>

        <form
          onSubmit={e =>
            e.preventDefault()
          }
        >

          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </div>


      {/* =========================
          BOTTOM FOOTER
      ========================== */}

      <div className="footerBottom">

        <p>
          © {new Date().getFullYear()}
          {" "}
          Varshney's Cloth Shop.
          All Rights Reserved.
        </p>

        <p>
          Designed with ❤️ for fashion lovers.
        </p>

      </div>

    </footer>
  );
};

export default FooterBar;