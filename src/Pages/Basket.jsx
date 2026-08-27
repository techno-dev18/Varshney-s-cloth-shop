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

      const user = JSON.parse(storedUser);

      const userId =
        user.id || user._id;

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
        "Cart Error:",
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

      alert(
        error.response?.data?.message ||
        "Unable to update quantity"
      );

    }
  };


  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (
    cartId
  ) => {

    try {

      await deleteCartItem(cartId);

      await fetchCart();

    } catch (error) {

      console.error(
        "Remove item error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to remove item"
      );

    }
  };


  // =========================
  // TOTAL
  // =========================

  const calculateTotal = () => {

    return cartItems.reduce(
      (total, item) => {

        const product =
          item.product;

        if (!product) {
          return total;
        }

        const price =
          Number(product.price) || 0;

        const discount =
          Number(
            product.discountPercentage
          ) || 0;

        const finalPrice =
          Math.round(
            price -
            (price * discount) / 100
          );

        return (
          total +
          finalPrice *
          item.quantity
        );

      },
      0
    );
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

      </section>
    );

  }


  // =========================
  // EMPTY
  // =========================

  if (cartItems.length === 0) {

    return (
      <section className="basketPage">

        <div className="emptyBasket">

          <h1>
            Your Basket is Empty
          </h1>

          <p>
            Add some products to your basket.
          </p>

        </div>

      </section>
    );

  }


  // =========================
  // BASKET
  // =========================

  return (

    <section className="basketPage">

      <h1>
        Your Basket
      </h1>

      <div className="basketLayout">

        {/* =====================
            PRODUCTS
        ===================== */}

        <div className="basketItems">

          {cartItems.map(item => {

            const product =
              item.product;

            if (!product) {
              return null;
            }

            const price =
              Number(product.price) || 0;

            const discount =
              Number(
                product.discountPercentage
              ) || 0;

            const finalPrice =
              Math.round(
                price -
                (price * discount) / 100
              );

            return (

              <div
                className="basketItem"
                key={item._id}
              >

                <img
                  src={product.imgURL}
                  alt={product.productName}
                />

                <div className="basketInfo">

                  <h3>
                    {product.productName}
                  </h3>

                  <p>
                    Brand: {product.brand}
                  </p>

                  <p>
                    Size:{" "}
                    <strong>
                      {item.selectedSize}
                    </strong>
                  </p>

                  <div className="basketPrice">

                    <strong>
                      ₹{finalPrice}
                    </strong>

                    {discount > 0 && (
                      <del>
                        ₹{price}
                      </del>
                    )}

                  </div>


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
                      removeItem(
                        item._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            );

          })}

        </div>


        {/* =====================
            SUMMARY
        ===================== */}

        <div className="basketSummary">

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
                  total + item.quantity,
                0
              )}
            </span>

          </div>

          <div className="summaryRow totalRow">

            <span>
              Total
            </span>

            <strong>
              ₹{calculateTotal()}
            </strong>

          </div>

          <button
            className="checkoutButton"
            onClick={() =>
              alert(
                "Checkout coming soon"
              )
            }
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </section>

  );
};

export default Basket;