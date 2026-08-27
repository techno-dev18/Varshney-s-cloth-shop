import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  insertProduct
} from "../Redux/slices/basketSlice";

import {
  addWishlist
} from "../Redux/slices/wishlistSlice.js";

import {
  addToCart
} from "../API/cartApi";

import "../Styles/ClothCard.css";


const ClothCard = ({ item }) => {

  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] =
    useState(item.sizes?.[0] || "");

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


  const handleAddToCart = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {

      alert("Please login first");

      return;
    }


    try {

      const response = await addToCart(
        user.id,
        item._id,
        selectedSize
      );


      console.log(
        "Cart API response:",
        response.data
      );


      // Keep Redux basket updated
      dispatch(
        insertProduct({
          ...item,
          selectedSize
        })
      );


      alert("Product added to basket");


    } catch (error) {

      console.error(
        "Add to cart error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to add product to cart"
      );
    }
  };


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


      <h3>
        {productName}
      </h3>


      <div className="cardTop">

        <span>
          {brand}
        </span>

        <span>
          ⭐ {ratings}
        </span>

      </div>


      <div className="priceSection">

        <span className="oldPrice">
          ₹{price}
        </span>

        <span className="newPrice">
          ₹{sellingPrice}
        </span>

      </div>


      <select
        value={selectedSize}
        onChange={(e) =>
          setSelectedSize(e.target.value)
        }
      >

        {sizes?.map(size => (

          <option
            key={size}
            value={size}
          >
            {size}
          </option>

        ))}

      </select>


      <button
        onClick={handleAddToCart}
      >
        Add To Basket
      </button>


      <button
        onClick={() =>
          dispatch(
            addWishlist(item)
          )
        }
      >
        ❤️ Wishlist
      </button>

    </div>
  );
};


export default ClothCard;