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

  const fetchCart = async () => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {

      const user = JSON.parse(storedUser);

      const response = await getCart(user.id);

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

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchCart();

  }, []);


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


  const handleRemove = async (cartId) => {

    try {

      await deleteCartItem(cartId);

      await fetchCart();

    } catch (error) {

      console.error(
        "Remove item error:",
        error
      );

    }

  };


  const calculateSellingPrice = (product) => {

    const price = Number(product.price) || 0;

    const discount =
      Number(product.discountPercentage) || 0;

    return Math.round(
      price -
      (price * discount) / 100
    );

  };


  const totalAmount = cartItems.reduce(
    (total, item) => {

      const price =
        calculateSellingPrice(
          item.product
        );

      return total +
        price * item.quantity;

    },
    0
  );


  if (loading) {

    return (
      <div className="basketMessage">
        <h2>Loading Basket...</h2>
      </div>
    );

  }


  if (cartItems.length === 0) {

    return (
      <section className="basketEmpty">

        <h1>Your Basket</h1>

        <h2>
          Your Basket is Empty
        </h2>

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


  return (

    <section className="basketPage">

      <h1>Your Basket</h1>


      <div className="basketContainer">

        {/* PRODUCTS */}

        <div className="basketProducts">

          {cartItems.map(item => {

            const product =
              item.product;

            const sellingPrice =
              calculateSellingPrice(
                product
              );

            return (

              <div
                className="basketItem"
                key={item._id}
              >

                <img
                  src={product.imgURL}
                  alt={
                    product.productName
                  }
                />


                <div className="basketDetails">

                  <h3>
                    {product.productName}
                  </h3>

                  <p>
                    Brand: {product.brand}
                  </p>

                  <p>
                    Size: {
                      item.selectedSize
                    }
                  </p>

                  <div className="basketPrice">

                    <span>
                      ₹{sellingPrice}
                    </span>

                    {product.discountPercentage >
                      0 && (

                      <del>
                        ₹{product.price}
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
                      -
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


                  <button
                    className="removeButton"
                    onClick={() =>
                      handleRemove(
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
                  total + item.quantity,
                0
              )}
            </span>

          </div>


          <div className="summaryRow">

            <span>
              Subtotal
            </span>

            <span>
              ₹{totalAmount}
            </span>

          </div>


          <hr />


          <div className="summaryTotal">

            <span>
              Total
            </span>

            <strong>
              ₹{totalAmount}
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