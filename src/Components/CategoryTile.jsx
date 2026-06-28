import { Link } from "react-router-dom";

import "../Styles/CategoryTile.css";

const CategoryTile = ({ category }) => {

  return (
    <Link
      className="categoryTile"
      to={`/collection/${category.categoryName}`}
    >
      <img src={category.imageURL} />

      <h3>{category.categoryName}</h3>
    </Link>
  );
};

export default CategoryTile;