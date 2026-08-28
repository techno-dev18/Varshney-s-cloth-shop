import { NavLink } from "react-router-dom";

import {
  FaShoppingBag,
  FaUserCircle,
  FaStore
} from "react-icons/fa";

import { useSelector } from "react-redux";

import "../Styles/HeaderBar.css";


const HeaderBar = () => {

  // =========================
  // GET BASKET FROM REDUX
  // =========================

  const basketItems = useSelector(
    store => store.basket
  );


  // =========================
  // TOTAL BASKET QUANTITY
  // =========================

  const basketCount = basketItems.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );


  return (

    <header className="header">

      {/* =========================
          LOGO
      ========================= */}

      <NavLink
        className="logo"
        to="/"
      >
        Varshney's Cloth Shop
      </NavLink>


      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="links">

        {/* COLLECTION */}

        <NavLink
          to="/collection"
          className="headerLink"
          title="Collection"
        >
          <FaStore />
        </NavLink>


        {/* WISHLIST */}

        <NavLink
          to="/wishlist"
          className="headerLink"
          title="Wishlist"
        >
          ❤️
        </NavLink>


        {/* BASKET */}

        <NavLink
          to="/basket"
          className="basketHeaderLink"
          title="Basket"
        >

          <FaShoppingBag />

          <span>
             {basketCount}
          </span>

        </NavLink>


        {/* ACCOUNT */}

        <NavLink
          to="/account"
          className="headerLink"
          title="Account"
        >
          <FaUserCircle />
        </NavLink>

      </nav>

    </header>

  );

};


export default HeaderBar;