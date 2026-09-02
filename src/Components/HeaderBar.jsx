import { NavLink } from "react-router-dom";
import {
  FaShoppingBag,
  FaUserCircle,
  FaStore,
  FaInfoCircle,
  FaEnvelope
} from "react-icons/fa";

import { useEffect, useState } from "react";

import { getCart } from "../API/cartApi";
import { getWishlist } from "../API/wishlistApi";

import "../Styles/HeaderBar.css";


const HeaderBar = () => {

  const [basketCount, setBasketCount] =
    useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);


  // ==========================================
  // FETCH COUNTS
  // ==========================================

  const fetchCounts = async () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      setBasketCount(0);
      setWishlistCount(0);

      return;
    }


    try {

      const user =
        JSON.parse(storedUser);


      // -------------------------------
      // CART
      // -------------------------------

      const cartResponse =
        await getCart(user.id);


      if (cartResponse.data.success) {

        const cartItems =
          cartResponse.data.cartItems || [];


        const totalQuantity =
          cartItems.reduce(
            (total, item) =>
              total +
              Number(item.quantity || 0),
            0
          );


        setBasketCount(
          totalQuantity
        );

      }


      // -------------------------------
      // WISHLIST
      // -------------------------------

      const wishlistResponse =
        await getWishlist(user.id);


      if (wishlistResponse.data.success) {

        setWishlistCount(
          wishlistResponse.data
            .wishlistItems?.length || 0
        );

      }


    } catch (error) {

      console.error(
        "Header Count Error:",
        error
      );

    }

  };


  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {

    fetchCounts();

  }, []);


  // ==========================================
  // LISTEN FOR CART/WISHLIST CHANGES
  // ==========================================

  useEffect(() => {

    const handleCartChange = () => {

      fetchCounts();

    };


    const handleWishlistChange = () => {

      fetchCounts();

    };


    window.addEventListener(
      "cartUpdated",
      handleCartChange
    );


    window.addEventListener(
      "wishlistUpdated",
      handleWishlistChange
    );


    return () => {

      window.removeEventListener(
        "cartUpdated",
        handleCartChange
      );


      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistChange
      );

    };

  }, []);


  return (

    <header className="header">


      {/* LOGO */}

      <NavLink
        className="logo"
        to="/"
      >
        Varshney's Cloth Shop
      </NavLink>


      <nav className="links">

  {/* COLLECTION */}
  <NavLink to="/collection" title="Collection">
    <FaStore />
  </NavLink>
{/* ABOUT */}
<NavLink
  to="/about"
  className="header-icon"
  title="About Us"
>
  <FaInfoCircle />
</NavLink>

{/* CONTACT */}
<NavLink
  to="/contact"
  className="header-icon"
  title="Contact Us"
>
  <FaEnvelope />
</NavLink>

  {/* WISHLIST */}
  <NavLink to="/wishlist" title="Wishlist">
    ❤️
    <span className="wishlistCount">
      {wishlistCount}
    </span>
  </NavLink>

  {/* BASKET */}
  <NavLink to="/basket" title="Basket">
    <FaShoppingBag />

    <span className="basketCount">
      {basketCount}
    </span>
  </NavLink>

  {/* ACCOUNT */}
  <NavLink to="/account" title="Account">
    <FaUserCircle />
  </NavLink>

</nav>

    </header>

  );

};


export default HeaderBar;