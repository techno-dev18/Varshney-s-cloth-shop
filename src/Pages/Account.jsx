import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserOrders
} from "../API/orderApi";

import "../Styles/Account.css";

const Account = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);


  // =========================
  // LOAD USER + ORDERS
  // =========================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const loggedUser =
      JSON.parse(storedUser);

    setUser(loggedUser);


    const loadOrders = async () => {

      try {

        const response =
          await getUserOrders(
            loggedUser.id
          );

        console.log(
          "Orders from MongoDB:",
          response.data
        );

        if (response.data.success) {

          setOrders(
            response.data.orders || []
          );

        }

      } catch (error) {

        console.error(
          "Order History Error:",
          error
        );

      } finally {

        setLoadingOrders(false);

      }

    };


    loadOrders();

  }, [navigate]);


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };


  // =========================
  // LOADING
  // =========================

  if (!user) {

    return (
      <h2>Loading...</h2>
    );

  }


  // =========================
  // ACCOUNT
  // =========================

  return (

    <section className="accountPage">

      {/* USER INFORMATION */}

      <div className="accountCard">

        <h1>
          My Account
        </h1>

        <h2>
          Welcome, {user.name}
        </h2>

        <p>
          Email: {user.email}
        </p>
<button
  onClick={() =>
    navigate("/orders")
  }
>
  My Orders
</button>
        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* ORDER HISTORY */}

      <div className="ordersSection">

        <h2>
          My Orders
        </h2>


        {loadingOrders ? (

          <p>
            Loading orders...
          </p>

        ) : orders.length === 0 ? (

          <div className="noOrders">

            <h3>
              No Orders Yet
            </h3>

            <p>
              Your completed orders
              will appear here.
            </p>

            <button
              onClick={() =>
                navigate("/collection")
              }
            >
              Start Shopping
            </button>

          </div>

        ) : (

          <div className="ordersList">

            {orders.map(order => (

              <div
                className="orderCard"
                key={order._id}
              >

                <div className="orderHeader">

                  <div>

                    <h3>
                      Order #{order._id.slice(-6)}
                    </h3>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>


                  <span
                    className={`orderStatus ${order.status?.toLowerCase()}`}
                  >
                    {order.status}
                  </span>

                </div>


                {/* ORDER PRODUCTS */}

                <div className="orderItems">

                  {order.items.map(
                    (item, index) => (

                      <div
                        className="orderItem"
                        key={index}
                      >

                        <img
                          src={item.imgURL}
                          alt={
                            item.productName
                          }
                        />


                        <div>

                          <h4>
                            {item.productName}
                          </h4>

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
                          ₹{item.price *
                            item.quantity}
                        </strong>

                      </div>

                    )
                  )}

                </div>


                {/* TOTAL */}

                <div className="orderTotal">

                  <span>
                    Order Total
                  </span>

                  <strong>
                    ₹{order.totalAmount}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );
};

export default Account;