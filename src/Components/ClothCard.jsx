import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  insertProduct
} from "../Redux/slices/basketSlice";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from "../API/wishlistApi";

import {
  addToCart
} from "../API/cartApi";

import "../Styles/ClothCard.css";


const ClothCard = ({ item }) => {

  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] =
    useState(item.sizes?.[0] || "");

  const [wishlistItem, setWishlistItem] =
    useState(null);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);


  const {
    productName,
    ratings,
    imgURL,
    price,
    brand,
    discountPercentage,
    sizes
  } = item;


  // ==========================================
  // CALCULATE SELLING PRICE
  // ==========================================

  const sellingPrice =
    Math.round(
      price -
      (price * discountPercentage) / 100
    );


  // ==========================================
  // CHECK WISHLIST STATUS
  // ==========================================

  const checkWishlistStatus = async () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    try {

      const response =
        await getWishlist();

      const wishlistItems =
        response.data.wishlistItems || [];

      const foundItem =
        wishlistItems.find(
          (wishlist) =>
            wishlist.product?._id === item._id
        );

      setWishlistItem(
        foundItem || null
      );

    } catch (error) {

      console.error(
        "Wishlist Fetch Error:",
        error
      );

    }
  };


  // ==========================================
  // LOAD WISHLIST STATUS
  // ==========================================

  useEffect(() => {

    checkWishlistStatus();

  }, [item._id]);


  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (!user) {

      alert("Please login first");

      return;
    }


    try {

      const response =
        await addToCart(
          item._id,
          selectedSize
        );


      console.log(
        "Cart API response:",
        response.data
      );


      window.dispatchEvent(
        new Event("cartUpdated")
      );


      dispatch(
        insertProduct({
          ...item,
          selectedSize
        })
      );


      alert(
        "Product added to basket"
      );


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


  // ==========================================
  // TOGGLE WISHLIST
  // ==========================================

  const handleWishlistToggle =
    async () => {

      const storedUser =
        localStorage.getItem("user");


      if (!storedUser) {

        alert("Please login first");

        return;
      }


      if (wishlistLoading) {
        return;
      }


      try {

        setWishlistLoading(true);


        // ====================================
        // REMOVE
        // ====================================

        if (wishlistItem) {

          console.log(
            "Removing wishlist item:",
            wishlistItem._id
          );


          const response =
            await removeFromWishlist(
              wishlistItem._id
            );


          console.log(
            "Remove wishlist response:",
            response.data
          );


          setWishlistItem(null);


          window.dispatchEvent(
            new Event("wishlistUpdated")
          );


          alert(
            "Removed from wishlist"
          );


        }

        // ====================================
        // ADD
        // ====================================

        else {

          const user =
            JSON.parse(storedUser);


          console.log(
            "Adding product to wishlist:",
            {
              userId: user.id,
              productId: item._id
            }
          );


          const response =
            await addToWishlist(
              user.id,
              item._id
            );


          console.log(
            "Add wishlist response:",
            response.data
          );


          // Fetch again so we get
          // the MongoDB wishlist _id

          const wishlistResponse =
            await getWishlist();


          const wishlistItems =
            wishlistResponse.data
              .wishlistItems || [];


          const newWishlistItem =
            wishlistItems.find(
              (wishlist) =>
                wishlist.product?._id ===
                item._id
            );


          setWishlistItem(
            newWishlistItem || null
          );


          window.dispatchEvent(
            new Event("wishlistUpdated")
          );


          alert(
            "Product added to wishlist"
          );

        }


      } catch (error) {

        console.error(
          "Wishlist Error:",
          error
        );


        alert(
          error.response?.data?.message ||
          "Wishlist operation failed"
        );

      } finally {

        setWishlistLoading(false);

      }

    };


  // ==========================================
  // UI
  // ==========================================

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
          setSelectedSize(
            e.target.value
          )
        }
      >

        {sizes?.map(
          (size) => (

            <option
              key={size}
              value={size}
            >
              {size}
            </option>

          )
        )}

      </select>


      <button
        onClick={handleAddToCart}
      >
        Add To Basket
      </button>


      <button
        onClick={handleWishlistToggle}
        disabled={wishlistLoading}
      >

        {wishlistLoading
          ? "Updating..."
          : wishlistItem
            ? "❤️ Remove from Wishlist"
            : "🤍 Add to Wishlist"
        }

      </button>


    </div>

  );

};


export default ClothCard;