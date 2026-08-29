import { NavLink } from "react-router-dom";
import {
  FaShoppingBag,
  FaUserCircle,
  FaStore
} from "react-icons/fa";

import { useEffect, useState } from "react";

import { getCart } from "../API/cartApi";

import "../Styles/HeaderBar.css";


const HeaderBar = () => {

  const [basketCount, setBasketCount] =
    useState(0);


  const fetchBasketCount = async () => {

    const storedUser =
      localStorage.getItem("user");

    // User not logged in
    if (!storedUser) {

      setBasketCount(0);

      return;
    }


    try {

      const user =
        JSON.parse(storedUser);

      const response =
        await getCart(user.id);

      if (response.data.success) {

        const cartItems =
          response.data.cartItems || [];

        // Total quantity
        const totalQuantity =
          cartItems.reduce(
            (total, item) =>
              total + item.quantity,
            0
          );

        setBasketCount(
          totalQuantity
        );

      }

    } catch (error) {

      console.error(
        "Basket count error:",
        error
      );

      setBasketCount(0);

    }

  };


  useEffect(() => {

    fetchBasketCount();

    // Update header when cart changes
    window.addEventListener(
      "cartUpdated",
      fetchBasketCount
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        fetchBasketCount
      );

    };

  }, []);


  return (

    <header className="header">

      <NavLink
        className="logo"
        to="/"
      >
        Varshney's Cloth Shop
      </NavLink>


      <nav className="links">

        <NavLink to="/collection">
          <FaStore />
        </NavLink>

<NavLink to="/wishlist">

          ❤️

          <span className="wishlistCount">

            {wishlistCount}

          </span>

        </NavLink>


        <NavLink to="/basket">

          <FaShoppingBag />

          🛒 {basketCount}

        </NavLink>


        <NavLink to="/account">

          <FaUserCircle />

        </NavLink>

      </nav>

    </header>

  );

};


export default HeaderBar;