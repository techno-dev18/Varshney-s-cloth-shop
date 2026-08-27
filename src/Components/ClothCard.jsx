import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import {
  insertProduct
} from "../Redux/slices/basketSlice";

import {
  addWishlist
} from "../Redux/slices/wishlistSlice.js";

import {
  addToCart
} from "../API/productApi";

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


  const [selectedSize, setSelectedSize] =
    useState(
      sizes?.[0] || ""
    );


  const [addingToCart, setAddingToCart] =
    useState(false);


  // =========================
  // PRICE
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
  // ADD TO CART
  // =========================

  const handleAddToBasket =
    async () => {

      try {

        // Check login

        const storedUser =
          localStorage.getItem("user");

        if (!storedUser) {

          alert(
            "Please login before adding products to basket."
          );

          return;
        }


        const user =
          JSON.parse(storedUser);


        if (!user._id) {

          alert(
            "User information is missing. Please login again."
          );

          return;
        }


        if (!selectedSize) {

          alert(
            "Please select a size."
          );

          return;
        }


        setAddingToCart(true);


        // =========================
        // SEND TO MONGODB
        // =========================

        const cartData = {

          user: user._id,

          product: _id,

          selectedSize: selectedSize,

          quantity: 1

        };


        console.log(
          "Adding to MongoDB cart:",
          cartData
        );


        const response =
          await addToCart(cartData);


        console.log(
          "Cart API response:",
          response.data
        );


        // =========================
        // UPDATE REDUX
        // =========================

        dispatch(
          insertProduct({
            ...item,
            selectedSize
          })
        );


        alert(
          "Product added to basket!"
        );


      } catch (error) {

        console.error(
          "Add to cart error:",
          error
        );


        alert(
          error.response?.data?.message ||
          "Unable to add product to basket."
        );


      } finally {

        setAddingToCart(false);

      }

    };


  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = () => {

    dispatch(
      addWishlist(item)
    );

  };


  return (

    <div className="clothCard">


      {/* IMAGE */}

      <Link
        to={`/collection/item/${_id}`}
      >

        <img
          src={imgURL}
          alt={productName}
        />

      </Link>


      {/* NAME */}

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

      <select
        value={selectedSize}
        onChange={(e) =>
          setSelectedSize(
            e.target.value
          )
        }
      >

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


      {/* BASKET */}

      <button
        onClick={
          handleAddToBasket
        }
        disabled={addingToCart}
      >

        {addingToCart
          ? "Adding..."
          : "Add To Basket"}

      </button>


      {/* WISHLIST */}

      <button
        onClick={
          handleWishlist
        }
      >
        ❤️ Wishlist
      </button>


    </div>

  );

};


export default ClothCard;