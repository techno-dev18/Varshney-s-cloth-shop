import { Link } from "react-router-dom";
import FooterBar from "../Components/FooterBar";
import {
  categories
}
from "../Data/clothData";

import CategoryTile
from "../Components/CategoryTile";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  return (
    <>
    <div className="categorySection">

<h1>
  Popular Categories
</h1>

<div className="categoryGrid">

  {
    categories.map(category => (

      <CategoryTile
        key={category.categoryName}
        category={category}
      />

    ))
  }

</div>

</div>
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