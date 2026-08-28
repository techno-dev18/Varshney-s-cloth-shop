import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserOrders
} from "../API/orderApi";

import "../Styles/Orders.css";


const Orders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const loadOrders = async () => {

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
          await getUserOrders(
            user.id
          );


        if (
          response.data.success
        ) {

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


  if (loading) {

    return (
      <div className="ordersMessage">
        <h2>
          Loading Orders...
        </h2>
      </div>
    );

  }


  if (orders.length === 0) {

    return (
      <section className="ordersEmpty">

        <h1>
          My Orders
        </h1>

        <h2>
          No Orders Yet
        </h2>

        <button
          onClick={() =>
            navigate("/collection")
          }
        >
          Start Shopping
        </button>

      </section>
    );

  }


  return (

    <section className="ordersPage">

      <h1>
        My Orders
      </h1>


      {orders.map(order => (

        <div
          className="orderCard"
          key={order._id}
        >

          <div className="orderHeader">

            <div>

              <h3>
                Order #{order._id.slice(-8)}
              </h3>

              <p>
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>

            </div>


            <span className="orderStatus">
              {order.status}
            </span>

          </div>


          <div className="orderProducts">

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
                      Size: {
                        item.selectedSize
                      }
                    </p>

                    <p>
                      Quantity: {
                        item.quantity
                      }
                    </p>

                    <strong>
                      ₹{
                        item.price *
                        item.quantity
                      }
                    </strong>

                  </div>

                </div>

              )
            )}

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

      ))}

    </section>

  );

};


export default Orders;