import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleOrder } from "../API/orderApi";

import "../Styles/OrderDetails.css";

const OrderDetails = () => {

  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


  // =====================================
  // LOAD ORDER
  // =====================================

  useEffect(() => {

    const loadOrder = async () => {

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      try {

        const response =
          await getSingleOrder(orderId);

        console.log(
          "Order Details:",
          response.data
        );

        if (response.data.success) {

          setOrder(
            response.data.order
          );

        }

      } catch (error) {

        console.error(
          "Order Details Error:",
          error
        );

        alert(
          error.response?.data?.message ||
          "Unable to load order"
        );

        navigate("/orders");

      } finally {

        setLoading(false);

      }

    };

    loadOrder();

  }, [orderId, navigate]);


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="orderDetailsMessage">
        <h2>Loading Order...</h2>
      </div>
    );

  }


  if (!order) {

    return (
      <div className="orderDetailsMessage">
        <h2>Order not found</h2>

        <button
          onClick={() =>
            navigate("/orders")
          }
        >
          Back to Orders
        </button>
      </div>
    );

  }


  // =====================================
  // TRACKING
  // =====================================

  const statuses = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered"
  ];

  const currentIndex =
    statuses.indexOf(
      order.orderStatus
    );


  // =====================================
  // DATE
  // =====================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  };


  return (

    <section className="orderDetailsPage">

      {/* =================================
          HEADER
      ================================= */}

      <div className="orderDetailsHeader">

        <button
          className="backOrdersButton"
          onClick={() =>
            navigate("/orders")
          }
        >
          ← Back to Orders
        </button>

        <h1>
          Order Details
        </h1>

        <p>
          Order #{order._id.slice(-8).toUpperCase()}
        </p>

      </div>


      {/* =================================
          TRACKING
      ================================= */}

      <div className="trackingCard">

        <h2>
          Order Tracking
        </h2>

        <div className="tracking">

          {statuses.map(
            (status, index) => {

              const completed =
                index <= currentIndex;

              return (

                <div
                  className={`trackingStep ${
                    completed
                      ? "completed"
                      : ""
                  }`}
                  key={status}
                >

                  <div className="trackingCircle">

                    {completed
                      ? "✓"
                      : index + 1}

                  </div>

                  <span>
                    {status}
                  </span>

                  {index <
                    statuses.length - 1 && (

                    <div
                      className={`trackingLine ${
                        index < currentIndex
                          ? "completed"
                          : ""
                      }`}
                    />

                  )}

                </div>

              );

            }
          )}

        </div>

        <p className="currentStatus">

          Current Status:

          <strong>
            {" "}
            {order.orderStatus}
          </strong>

        </p>

      </div>


      {/* =================================
          ORDER INFORMATION
      ================================= */}

      <div className="orderDetailsGrid">


        {/* =================================
            PRODUCTS
        ================================= */}

        <div className="detailsCard">

          <h2>
            Ordered Products
          </h2>

          {order.items.map(
            (item, index) => (

              <div
                className="detailsProduct"
                key={index}
              >

                <img
                  src={item.imgURL}
                  alt={item.productName}
                />


                <div>

                  <h3>
                    {item.productName}
                  </h3>

                  <p>
                    Size:{" "}
                    {item.selectedSize}
                  </p>

                  <p>
                    Quantity:{" "}
                    {item.quantity}
                  </p>

                  <p>
                    Price: ₹{item.price}
                  </p>

                </div>


                <strong>
                  ₹
                  {item.price *
                    item.quantity}
                </strong>

              </div>

            )
          )}

        </div>


        {/* =================================
            DELIVERY ADDRESS
        ================================= */}

        <div className="detailsCard">

          <h2>
            Delivery Address
          </h2>

          <div className="addressBox">

            <h3>
              {order.shippingAddress.name}
            </h3>

            <p>
              {order.shippingAddress.address}
            </p>

            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>

            <p>
              Pincode:{" "}
              {order.shippingAddress.pincode}
            </p>

            <p>
              Phone:{" "}
              {order.shippingAddress.phone}
            </p>

          </div>

        </div>


        {/* =================================
            PAYMENT
        ================================= */}

        <div className="detailsCard">

          <h2>
            Payment Information
          </h2>

          <div className="infoRow">

            <span>
              Payment Method
            </span>

            <strong>
              {order.paymentMethod}
            </strong>

          </div>


          <div className="infoRow">

            <span>
              Payment Status
            </span>

            <strong>
              {order.paymentStatus}
            </strong>

          </div>


          <div className="infoRow">

            <span>
              Order Date
            </span>

            <strong>
              {formatDate(
                order.createdAt
              )}
            </strong>

          </div>

        </div>


        {/* =================================
            TOTAL
        ================================= */}

        <div className="detailsCard totalCard">

          <h2>
            Order Total
          </h2>

          <div className="totalRow">

            <span>
              Items
            </span>

            <span>
              {order.items.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>

          </div>


          <div className="totalRow">

            <span>
              Subtotal
            </span>

            <span>
              ₹{order.totalAmount}
            </span>

          </div>


          <hr />


          <div className="grandTotal">

            <span>
              Total
            </span>

            <strong>
              ₹{order.totalAmount}
            </strong>

          </div>

        </div>

      </div>

    </section>

  );

};

export default OrderDetails;