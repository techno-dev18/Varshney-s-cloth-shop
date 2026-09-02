import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOrders } from "../API/orderApi";

import "../Styles/Orders.css";

const Orders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // =====================================
  // LOAD ORDERS
  // =====================================

  useEffect(() => {

    const loadOrders = async () => {

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      try {

       

        const response =
          await getOrders();

        console.log(
          "Orders:",
          response.data
        );

        if (response.data.success) {

          setOrders(
            response.data.orders || []
          );

        }

      } catch (error) {

        console.error(
          "Orders Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadOrders();

  }, [navigate]);


  // =====================================
  // FORMAT DATE
  // =====================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );

  };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="ordersMessage">
        <h2>Loading Orders...</h2>
      </div>
    );

  }


  // =====================================
  // EMPTY ORDERS
  // =====================================

  if (orders.length === 0) {

    return (

      <section className="ordersPage">

        <div className="ordersEmpty">

          <h1>
            My Orders
          </h1>

          <div className="emptyIcon">
            🛍️
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() =>
              navigate("/collection")
            }
          >
            Start Shopping
          </button>

        </div>

      </section>

    );

  }


  return (

    <section className="ordersPage">

      <div className="ordersHeader">

        <div>

          <h1>
            My Orders
          </h1>

          <p>
            View and track your orders
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/collection")
          }
        >
          Continue Shopping
        </button>

      </div>


      <div className="ordersList">

        {orders.map(order => (

          <div
            className="orderCard"
            key={order._id}
          >

            {/* =========================
                ORDER HEADER
            ========================= */}

            <div className="orderTop">

              <div>

                <span className="orderLabel">
                  Order ID
                </span>

                <strong>
                  #{order._id.slice(-8).toUpperCase()}
                </strong>

              </div>


              <div>

                <span className="orderLabel">
                  Ordered On
                </span>

                <strong>
                  {formatDate(
                    order.createdAt
                  )}
                </strong>

              </div>


              <span
                className={`orderStatus ${order.orderStatus
                  ?.toLowerCase()
                  .replace(" ", "-")}`}
              >
                {order.orderStatus}
              </span>

            </div>


            {/* =========================
                PRODUCTS
            ========================= */}

            <div className="orderProducts">

              {order.items.map(
                (item, index) => (

                  <div
                    className="orderProduct"
                    key={index}
                  >

                    <img
                      src={item.imgURL}
                      alt={
                        item.productName
                      }
                    />


                    <div className="orderProductInfo">

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


            {/* =========================
                DELIVERY
            ========================= */}

            <div className="orderBottom">

              <div className="deliveryInfo">

                <h3>
                  Delivery Address
                </h3>

                <p>
                  {order.shippingAddress.name}
                </p>

                <p>
                  {order.shippingAddress.address}
                </p>

                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}{" "}
                  -{" "}
                  {order.shippingAddress.pincode}
                </p>

                <p>
                  Phone:{" "}
                  {order.shippingAddress.phone}
                </p>

              </div>


              <div className="orderPayment">

                <p>
                  Payment
                </p>

                <strong>
                  {order.paymentMethod}
                </strong>

                <p>
                  Payment Status
                </p>

                <strong>
                  {order.paymentStatus}
                </strong>

              </div>


              <div className="orderTotal">

                <span>
                  Total
                </span>

                <strong>
                  ₹{order.totalAmount}
                </strong>

              </div>

            </div>


            {/* =========================
                VIEW DETAILS
            ========================= */}

            <button
              className="viewOrderButton"
              onClick={() =>
                navigate(
                  `/orders/${order._id}`
                )
              }
            >
              View Order Details
            </button>

          </div>

        ))}

      </div>

    </section>

  );

};

export default Orders;