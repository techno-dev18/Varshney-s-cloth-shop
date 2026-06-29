import {
  useSelector,
  useDispatch
}
  from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  deleteProduct
}
  from "../Redux/slices/basketSlice";

import "../Styles/Basket.css";

const Basket = () => {

  const items =
    useSelector(
      store =>
        store.basket
    );

  const ClothCard = ({ item }) => {

    const dispatch = useDispatch();


  }
  const totalAmount = items.reduce(
    (sum, item) =>
      sum +
      Math.round(
        item.price -
        item.price *
        item.discountPercentage / 100
      ) * item.quantity,
    0
  );
  return (

    <div className="basketPage">

      <h1>
        Shopping Basket
      </h1>

      {
        items.length === 0 ?

          <h2>
            Basket Empty
          </h2>

          :

          items.map(item => (

            <div
              className="basketCard"
              key={item.productName}
            >

              <img
                src={item.imgURL}
                alt=""
              />

              <h3>
                {item.productName}
              </h3>

              <button
                onClick={() =>
                  dispatch(
                    deleteProduct(
                      item.productName
                    )
                  )
                }
              >
                Remove
              </button>
              <div className="quantityBox">
                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity(
                        item.productName
                      )
                    )
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(
                      increaseQuantity(
                        item.productName
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>

          ))
      }
<h2>Total: ₹{totalAmount}</h2>
    </div>
  );
};

export default Basket;