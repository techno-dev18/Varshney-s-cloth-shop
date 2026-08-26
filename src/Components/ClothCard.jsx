import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  insertProduct
} from "../Redux/slices/basketSlice";

import {
  addWishlist
} from "../Redux/slices/wishlistSlice.js";

import "../Styles/ClothCard.css";


const ClothCard = ({ item }) => {

  const dispatch = useDispatch();

  const {
    _id,
    productName,
    ratings,
    imgURL,
    price,
    brand,
    discountPercentage,
    sizes
  } = item;


  // =========================
  // CALCULATE SELLING PRICE
  // =========================

  const originalPrice =
    Number(price || 0);

  const discount =
    Number(discountPercentage || 0);

  const sellingPrice =
    Math.round(
      originalPrice -
      (
        originalPrice *
        discount
      ) / 100
    );


  // =========================
  // ADD TO REDUX BASKET
  // =========================

  const handleAddToBasket = () => {

    dispatch(
      insertProduct(item)
    );

    console.log(
      "Product added to Redux basket:",
      item
    );

  };


  // =========================
  // ADD TO WISHLIST
  // =========================

  const handleWishlist = () => {

    dispatch(
      addWishlist(item)
    );

  };


  return (

    <div className="clothCard">


      {/* PRODUCT IMAGE */}

      <Link
        to={`/collection/item/${_id}`}
      >

        <img
          src={imgURL}
          alt={productName}
        />

      </Link>


      {/* PRODUCT NAME */}

      <h3>
        {productName}
      </h3>


      {/* BRAND + RATING */}

      <div className="cardTop">

        <span>
          {brand}
        </span>

        <span>
          ⭐ {ratings}
        </span>

      </div>


      {/* PRICE */}

      <div className="priceSection">

        <span className="oldPrice">

          ₹{originalPrice}

        </span>

        <span className="newPrice">

          ₹{sellingPrice}

        </span>

      </div>


      {/* SIZE */}

      <select>

        {(sizes || []).map(
          size => (

            <option
              key={size}
              value={size}
            >
              {size}
            </option>

          )
        )}

      </select>


      {/* ADD TO BASKET */}

      <button
        onClick={handleAddToBasket}
      >
        Add To Basket
      </button>


      {/* WISHLIST */}

      <button
        onClick={handleWishlist}
      >
        ❤️ Wishlist
      </button>


    </div>

  );

};


export default ClothCard;