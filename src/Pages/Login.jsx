import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Styles/Login.css";

const API_URL =
  "https://varshney-s-cloth-shop.onrender.com/api";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter email and password"
      );
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/users/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
          "Login failed"
        );
        return;
      }

      /*
        Save logged-in user
        in browser storage.
      */

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful!");

      navigate("/account");

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );

      setError(
        "Unable to connect to server"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="authPage">

      <div className="authCard">

        <h1>Welcome Back</h1>

        <p>
          Login to Varshney's Cloth Shop
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="authError">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="authSwitch">

          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>

        </p>

      </div>

    </section>
  );
};

export default Login;