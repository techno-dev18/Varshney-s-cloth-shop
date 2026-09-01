import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCart } from "../API/cartApi";
import { createOrder } from "../API/orderApi";

import "../Styles/Checkout.css";

const API_URL =
  "https://varshney-s-cloth-shop.onrender.com/api";

const Checkout = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  // =====================================
  // LOAD CART
  // =====================================

  useEffect(() => {

    const loadCheckout = async () => {

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      try {

        const user =
          JSON.parse(storedUser);

        const response =
          await getCart(user.id);

        if (
          response.data.success &&
          response.data.cartItems.length > 0
        ) {

          setCartItems(
            response.data.cartItems
          );

        } else {

          navigate("/basket");

        }

      } catch (error) {

        console.error(
          "Checkout cart error:",
          error
        );

        navigate("/basket");

      } finally {

        setLoading(false);

      }

    };

    loadCheckout();

  }, [navigate]);


  // =====================================
  // ADDRESS CHANGE
  // =====================================

  const handleAddressChange = (e) => {

    const { name, value } = e.target;

    setAddress(prev => ({
      ...prev,
      [name]: value
    }));

  };


  // =====================================
  // PRICE
  // =====================================

  const calculateSellingPrice = (product) => {

    const price =
      Number(product.price) || 0;

    const discount =
      Number(product.discountPercentage) || 0;

    return Math.round(
      price -
      (price * discount) / 100
    );

  };


  const totalAmount =
    cartItems.reduce(
      (total, item) => {

        const price =
          calculateSellingPrice(
            item.product
          );

        return (
          total +
          price * item.quantity
        );

      },
      0
    );


  // =====================================
  // PLACE ORDER
  // =====================================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();

    // Validate address

    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.address.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.pincode.trim()
    ) {

      alert(
        "Please fill all delivery address fields"
      );

      return;

    }


    if (address.phone.length !== 10) {

      alert(
        "Please enter a valid 10-digit phone number"
      );

      return;

    }


    if (address.pincode.length !== 6) {

      alert(
        "Please enter a valid 6-digit pincode"
      );

      return;

    }


    try {

      setPlacingOrder(true);

      const storedUser =
        localStorage.getItem("user");

      const user =
        JSON.parse(storedUser);


      const orderData = {

        shippingAddress: address,

        paymentMethod,

        totalAmount

      };


      const response =
        await createOrder(
          user.id,
          orderData
        );


      console.log(
        "Order response:",
        response.data
      );


      if (response.data.success) {

        alert(
          "Order placed successfully!"
        );

        navigate("/orders");

      }

    } catch (error) {

      console.error(
        "Place Order Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to place order"
      );

    } finally {

      setPlacingOrder(false);

    }

  };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="checkoutMessage">
        <h2>Loading Checkout...</h2>
      </div>
    );

  }


  return (

    <section className="checkoutPage">

      <h1>
        Checkout
      </h1>


      <form
        className="checkoutContainer"
        onSubmit={handlePlaceOrder}
      >

        {/* =================================
            DELIVERY ADDRESS
        ================================= */}

        <div className="checkoutForm">

          <div className="checkoutCard">

            <h2>
              Delivery Address
            </h2>


            <div className="formGroup">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={address.name}
                onChange={handleAddressChange}
              />

            </div>


            <div className="formGroup">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                maxLength="10"
                placeholder="10-digit mobile number"
                value={address.phone}
                onChange={handleAddressChange}
              />

            </div>


            <div className="formGroup">

              <label>
                Address
              </label>

              <textarea
                name="address"
                placeholder="House number, street, area"
                value={address.address}
                onChange={handleAddressChange}
                rows="4"
              />

            </div>


            <div className="formGrid">

              <div className="formGroup">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleAddressChange}
                />

              </div>


              <div className="formGroup">

                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleAddressChange}
                />

              </div>

            </div>


            <div className="formGroup">

              <label>
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                maxLength="6"
                placeholder="6-digit pincode"
                value={address.pincode}
                onChange={handleAddressChange}
              />

            </div>

          </div>


          {/* =================================
              PAYMENT
          ================================= */}

          <div className="checkoutCard">

            <h2>
              Payment Method
            </h2>

            <label className="paymentOption">

              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  paymentMethod ===
                  "Cash on Delivery"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <span>
                Cash on Delivery
              </span>

            </label>

          </div>

        </div>


        {/* =================================
            ORDER SUMMARY
        ================================= */}

        <aside className="checkoutSummary">

          <h2>
            Order Summary
          </h2>


          <div className="checkoutItems">

            {cartItems.map(item => {

              const product =
                item.product;

              const price =
                calculateSellingPrice(
                  product
                );

              return (

                <div
                  className="checkoutItem"
                  key={item._id}
                >

                  <img
                    src={product.imgURL}
                    alt={product.productName}
                  />

                  <div>

                    <h3>
                      {product.productName}
                    </h3>

                    <p>
                      Size:{" "}
                      {item.selectedSize}
                    </p>

                    <p>
                      Qty:{" "}
                      {item.quantity}
                    </p>

                  </div>

                  <strong>
                    ₹{price * item.quantity}
                  </strong>

                </div>

              );

            })}

          </div>


          <div className="checkoutTotal">

            <span>
              Total
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>


          <button
            type="submit"
            className="placeOrderButton"
            disabled={placingOrder}
          >

            {placingOrder
              ? "Placing Order..."
              : "Place Order"}

          </button>


          <button
            type="button"
            className="backToBasket"
            onClick={() =>
              navigate("/basket")
            }
          >
            Back to Basket
          </button>

        </aside>

      </form>

    </section>

  );

};

export default Checkout;