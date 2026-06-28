import { Link } from "react-router-dom";

import "../Styles/ClothCard.css";

const ClothCard = ({ item }) => {

  const {
    productName,
    ratings,
    imgURL,
    price,
    brand,
    discountPercentage,
    sizes
  } = item;

  const sellingPrice =
    Math.round(
      price -
      (price * discountPercentage) / 100
    );

  return (
    <div className="clothCard">

      <Link
        to={`/collection/item/${productName}`}
      >
        <img
          src={imgURL}
          alt={productName}
        />
      </Link>

      <h3>{productName}</h3>

      <div className="cardTop">
        <span>{brand}</span>
        <span>⭐ {ratings}</span>
      </div>

      <div className="priceSection">
        <span className="oldPrice">
          ₹{price}
        </span>

        <span className="newPrice">
          ₹{sellingPrice}
        </span>
      </div>

      <select>
        {sizes.map(size => (
          <option key={size}>
            {size}
          </option>
        ))}
      </select>

      <button>
        Add To Basket
      </button>

    </div>
  );
};

export default ClothCard;