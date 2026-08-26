import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://varshney-s-cloth-shop.onrender.com/api";

const Basket = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchCart = async () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    try {

      const response = await fetch(
        `${API_URL}/cart/${user.id}`
      );

      const data = await response.json();

      if (data.success) {
        setCartItems(data.cartItems);
      }

    } catch (error) {

      console.error(
        "Cart Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

  const updateQuantity = async (
    cartId,
    action
  ) => {

    await fetch(
      `${API_URL}/cart/${cartId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          action
        })
      }
    );

    fetchCart();
  };

  const removeItem = async (cartId) => {

    await fetch(
      `${API_URL}/cart/${cartId}`,
      {
        method: "DELETE"
      }
    );

    fetchCart();
  };

  if (loading) {
    return <h2>Loading Basket...</h2>;
  }

  if (cartItems.length === 0) {
    return (
      <h2>
        Your Basket is Empty
      </h2>
    );
  }

  return (
    <section className="basketPage">

      <h1>Your Basket</h1>

      {cartItems.map(item => (

        <div
          className="basketItem"
          key={item._id}
        >

          <img
            src={item.product.imgURL}
            alt={item.product.productName}
          />

          <div>

            <h3>
              {item.product.productName}
            </h3>

            <p>
              Size: {item.selectedSize}
            </p>

            <p>
              ₹{item.product.price}
            </p>

            <button
              onClick={() =>
                updateQuantity(
                  item._id,
                  "decrement"
                )
              }
            >
              -
            </button>

            <span>
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(
                  item._id,
                  "increment"
                )
              }
            >
              +
            </button>

            <button
              onClick={() =>
                removeItem(item._id)
              }
            >
              Remove
            </button>

          </div>

        </div>

      ))}

    </section>
  );
};

export default Basket;