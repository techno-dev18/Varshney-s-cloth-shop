import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Account.css";

const Account = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(
      JSON.parse(storedUser)
    );

  }, [navigate]);

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };

  if (!user) {
    return (
      <div className="accountLoading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (

    <section className="accountPage">

      <div className="accountCard">

        <h1>
          My Account
        </h1>

        <div className="accountInfo">

          <h2>
            Welcome, {user.name}
          </h2>

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>

        </div>

        <button
          className="logoutBtn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </section>

  );
};

export default Account;