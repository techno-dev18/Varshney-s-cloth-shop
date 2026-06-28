import { Link } from "react-router-dom";
import FooterBar from "../Components/FooterBar";

import "../Styles/Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <section className="hero">
        <img
          src="https://images.pexels.com/photos/33517294/pexels-photo-33517294.jpeg"
          alt=""
        />

        <Link
          className="shopBtn"
          to="/collection"
        >
          Shop Now
        </Link>
      </section>

      <FooterBar />
    </>
  );
};

export default Dashboard;