import { NavLink } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaStore } from "react-icons/fa";

import "../Styles/HeaderBar.css";

const HeaderBar = () => {
  return (
    <header className="header">
      <NavLink className="logo" to="/">
        Varshney's Cloth Shop
      </NavLink>

      <nav className="links">
        <NavLink to="/collection">
          <FaStore />
        </NavLink>

        <NavLink to="/basket">
          <FaShoppingBag />
        </NavLink>

        <NavLink to="/account">
          <FaUserCircle />
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderBar;