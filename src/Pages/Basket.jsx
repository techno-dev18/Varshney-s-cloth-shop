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
  
            </div>
  
          ))
        }
  
      </div>
    );
  };
  
  export default Basket;