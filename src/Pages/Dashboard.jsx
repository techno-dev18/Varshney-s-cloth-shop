import { Link } from "react-router-dom";
import FooterBar from "../Components/FooterBar";
import {
  categories
}
from "../Data/clothData";
import { heroImage } from "../Data/constants";
import CategoryTile
from "../Components/CategoryTile";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  return (
    <>
   
      <section className="hero">
        <img src={heroImage} alt="Varshney's Cloth Shop" />

        <Link
          className="shopBtn"
          to="/collection"
        >
          Shop Now
        </Link>
      </section>
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
      <FooterBar />
    </>
  );
};

export default Dashboard;