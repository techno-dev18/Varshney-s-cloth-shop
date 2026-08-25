import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

const API_URL =
  "https://varshney-s-cloth-shop.onrender.com/api";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/users/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {

      console.error(error);

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

        <h1>Create Account</h1>

        <p>
          Join Varshney's Cloth Shop
        </p>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>

        <p className="authSwitch">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </section>
  );
};

export default Signup;