import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCart,
  updateCart,
  deleteCartItem
} from "../API/cartApi";

import "../Styles/Basket.css";

const Basket = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH CART
  // =========================

  const fetchCart = async () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const user = JSON.parse(storedUser);

      // Your login currently stores id
      const userId = user.id || user._id;

      const response =
        await getCart(userId);

      console.log(
        "Cart from MongoDB:",
        response.data
      );

      if (response.data.success) {

        setCartItems(
          response.data.cartItems || []
        );

      }

    } catch (error) {

      console.error(
        "Fetch Cart Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load basket"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // LOAD CART
  // =========================

  useEffect(() => {

    fetchCart();

  }, []);


  // =========================
  // UPDATE QUANTITY
  // =========================

  const handleQuantity = async (
    cartId,
    action
  ) => {

    try {

      await updateCart(
        cartId,
        action
      );

      await fetchCart();

    } catch (error) {

      console.error(
        "Quantity update error:",
        error
      );

    }
  };


  // =========================
  // REMOVE PRODUCT
  // =========================

  const removeItem = async (
    cartId
  ) => {

    try {

      await deleteCartItem(
        cartId
      );

      await fetchCart();

    } catch (error) {

      console.error(
        "Remove item error:",
        error
      );

    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <section className="basketPage">

        <h2>
          Loading Basket...
        </h2>

      </section>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <section className="basketPage">

        <h2>
          {error}
        </h2>

        <button
          onClick={fetchCart}
        >
          Try Again
        </button>

      </section>
    );

  }


  // =========================
  // EMPTY CART
  // =========================

  if (cartItems.length === 0) {

    return (
      <section className="basketPage emptyBasket">

        <h1>
          Your Basket is Empty
        </h1>

        <p>
          Add some products to your basket.
        </p>

        <button
          onClick={() =>
            navigate("/collection")
          }
        >
          Continue Shopping
        </button>

      </section>
    );

  }


  // =========================
  // TOTAL
  // =========================

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.product?.price || 0) *
        Number(item.quantity || 1),
      0
    );


  // =========================
  // UI
  // =========================

  return (

    <section className="basketPage">

      <h1>
        Your Basket
      </h1>


      <div className="basketContainer">

        {/* PRODUCTS */}

        <div className="basketProducts">

          {cartItems.map(item => {

            const product =
              item.product;

            if (!product) {
              return null;
            }

            return (

              <div
                className="basketItem"
                key={item._id}
              >

                <img
                  src={product.imgURL}
                  alt={product.productName}
                />


                <div className="basketDetails">

                  <h3>
                    {product.productName}
                  </h3>

                  <p>
                    Brand: {product.brand}
                  </p>

                  <p>
                    Size: {item.selectedSize}
                  </p>

                  <p className="basketPrice">
                    ₹{product.price}
                  </p>


                  {/* QUANTITY */}

                  <div className="quantityControls">

                    <button
                      onClick={() =>
                        handleQuantity(
                          item._id,
                          "decrement"
                        )
                      }
                      disabled={
                        item.quantity <= 1
                      }
                    >
                      −
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      onClick={() =>
                        handleQuantity(
                          item._id,
                          "increment"
                        )
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* REMOVE */}

                  <button
                    className="removeButton"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            );

          })}

        </div>


        {/* SUMMARY */}

        <aside className="basketSummary">

          <h2>
            Order Summary
          </h2>

          <div className="summaryRow">

            <span>
              Items
            </span>

            <span>
              {cartItems.reduce(
                (total, item) =>
                  total +
                  item.quantity,
                0
              )}
            </span>

          </div>


          <div className="summaryRow">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>


          <button
            className="checkoutButton"
            onClick={() =>
              alert(
                "Checkout will be added next."
              )
            }
          >
            Proceed to Checkout
          </button>

        </aside>

      </div>

    </section>
  );
};

export default Basket;