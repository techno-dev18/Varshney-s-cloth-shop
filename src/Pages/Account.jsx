import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    return <h2>Loading...</h2>;
  }

  return (
    <section>

      <h1>User Account</h1>

      <h2>
        Welcome, {user.name}
      </h2>

      <p>
        Email: {user.email}
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </section>
  );
};

export default Account;