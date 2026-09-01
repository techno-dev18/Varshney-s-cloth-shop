import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOrders } from "../API/orderApi";

import "../Styles/Orders.css";

const Orders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = async () => {

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
        await getOrders(user.id);

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


  useEffect(() => {

    fetchOrders();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <section className="ordersMessage">
        <h2>Loading Orders...</h2>
      </section>
    );

  }


  // ==========================================
  // EMPTY ORDERS
  // ==========================================

  if (orders.length === 0) {

    return (

      <section className="ordersEmpty">

        <h1>My Orders</h1>

        <div className="emptyOrdersCard">

          <h2>
            You haven't placed any orders yet.
          </h2>

          <p>
            Your completed orders will appear here.
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


  // ==========================================
  // ORDERS
  // ==========================================

  return (

    <section className="ordersPage">

      <div className="ordersHeader">

        <div>

          <h1>
            My Orders
          </h1>

          <p>
            {orders.length} order
            {orders.length !== 1 ? "s" : ""}
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

          <article
            className="orderCard"
            key={order._id}
          >

            {/* =========================
                ORDER HEADER
            ========================= */}

            <div className="orderTop">

              <div>

                <h3>
                  Order #{order._id.slice(-8)}
                </h3>

                <p>
                  Placed on{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }
                  )}
                </p>

              </div>


              <span
                className={`orderStatus ${order.orderStatus
                  ?.toLowerCase()
                  .replace(
                    /\s+/g,
                    "-"
                  )}`}
              >
                {order.orderStatus}
              </span>

            </div>


            {/* =========================
                PRODUCTS
            ========================= */}

            <div className="orderItems">

              {order.items.map(
                (item, index) => (

                  <div
                    className="orderItem"
                    key={
                      item._id ||
                      `${order._id}-${index}`
                    }
                  >

                    <img
                      src={item.imgURL}
                      alt={
                        item.productName
                      }
                    />


                    <div className="orderItemDetails">

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
                ORDER FOOTER
            ========================= */}

            <div className="orderBottom">

              <div>

                <span>
                  Payment
                </span>

                <strong>
                  {order.paymentMethod}
                </strong>

              </div>


              <div>

                <span>
                  Payment Status
                </span>

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
                DELIVERY ADDRESS
            ========================= */}

            {order.shippingAddress && (

              <div className="orderAddress">

                <h3>
                  Delivery Address
                </h3>

                <p>
                  {order.shippingAddress.name}
                </p>

                <p>
                  {order.shippingAddress.phone}
                </p>

                <p>
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>

              </div>

            )}

          </article>

        ))}

      </div>

    </section>

  );

};

export default Orders;