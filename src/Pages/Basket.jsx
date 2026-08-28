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

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const user = JSON.parse(storedUser);

      const userId = user.id || user._id;

      const response = await getCart(userId);

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
        "Unable to load your basket."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // INITIAL LOAD
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

        <div className="basketLoading">

          <h2>
            Loading Your Basket...
          </h2>

        </div>

      </section>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <section className="basketPage">

        <div className="basketError">

          <h2>
            {error}
          </h2>

          <button
            onClick={fetchCart}
          >
            Try Again
          </button>

        </div>

      </section>
    );

  }


  // =========================
  // EMPTY BASKET
  // =========================

  if (cartItems.length === 0) {

    return (
      <section className="basketPage">

        <div className="emptyBasket">

          <div className="emptyBasketIcon">
            🛒
          </div>

          <h1>
            Your Basket is Empty
          </h1>

          <p>
            Looks like you haven't added
            anything to your basket yet.
          </p>

          <button
            onClick={() =>
              navigate("/collection")
            }
          >
            Continue Shopping
          </button>

        </div>

      </section>
    );

  }


  // =========================
  // CALCULATE TOTALS
  // =========================

  const subtotal = cartItems.reduce(
    (total, item) => {

      const price =
        Number(item.product?.price || 0);

      const quantity =
        Number(item.quantity || 1);

      return total + price * quantity;

    },
    0
  );


  // Free delivery above ₹999
  const delivery =
    subtotal >= 999 ? 0 : 99;

  const grandTotal =
    subtotal + delivery;


  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );


  // =========================
  // UI
  // =========================

  return (

    <section className="basketPage">

      <div className="basketContainer">

        {/* =====================
            PAGE HEADER
        ===================== */}

        <div className="basketHeader">

          <h1>
            Your Basket
          </h1>

          <p>
            {totalItems}{" "}
            {totalItems === 1
              ? "item"
              : "items"}{" "}
            in your basket
          </p>

        </div>


        {/* =====================
            MAIN CONTENT
        ===================== */}

        <div className="basketLayout">


          {/* =====================
              PRODUCTS
          ===================== */}

          <div className="basketProducts">

            {cartItems.map(item => {

              const product =
                item.product;

              if (!product) {
                return null;
              }

              const price =
                Number(product.price || 0);

              const itemTotal =
                price *
                Number(item.quantity || 1);


              return (

                <div
                  className="basketItem"
                  key={item._id}
                >

                  {/* PRODUCT IMAGE */}

                  <div className="basketImage">

                    <img
                      src={product.imgURL}
                      alt={
                        product.productName
                      }
                    />

                  </div>


                  {/* PRODUCT INFORMATION */}

                  <div className="basketDetails">

                    <h2>
                      {product.productName}
                    </h2>

                    <p className="basketBrand">
                      {product.brand}
                    </p>

                    <p>
                      Size:{" "}
                      <strong>
                        {item.selectedSize}
                      </strong>
                    </p>

                    <p className="basketUnitPrice">
                      ₹{price}
                    </p>


                    {/* QUANTITY */}

                    <div className="quantityArea">

                      <span>
                        Quantity
                      </span>

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


                  {/* ITEM TOTAL */}

                  <div className="itemTotal">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{itemTotal}
                    </strong>

                  </div>

                </div>

              );

            })}

          </div>


          {/* =====================
              ORDER SUMMARY
          ===================== */}

          <aside className="basketSummary">

            <h2>
              Order Summary
            </h2>


            <div className="summaryRow">

              <span>
                Items
              </span>

              <span>
                {totalItems}
              </span>

            </div>


            <div className="summaryRow">

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>


            <div className="summaryRow">

              <span>
                Delivery
              </span>

              <span>

                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}

              </span>

            </div>


            <div className="summaryDivider">
            </div>


            <div className="summaryTotal">

              <span>
                Total
              </span>

              <strong>
                ₹{grandTotal}
              </strong>

            </div>


            {subtotal < 999 && (

              <p className="deliveryMessage">

                Add ₹
                {999 - subtotal}
                {" "}more to get
                <strong>
                  {" "}FREE delivery
                </strong>

              </p>

            )}


            <button
              className="checkoutButton"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed to Checkout
            </button>


            <button
              className="continueButton"
              onClick={() =>
                navigate("/collection")
              }
            >
              Continue Shopping
            </button>

          </aside>

        </div>

      </div>

    </section>

  );
};

export default Basket;