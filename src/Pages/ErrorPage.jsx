import { NavLink } from "react-router-dom";

import "../Styles/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="errorBox">
      <h1>Page Not Found</h1>

      <NavLink to="/">
        Back Home
      </NavLink>
    </div>
  );
};

export default ErrorPage;