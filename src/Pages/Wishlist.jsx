import { useSelector, useDispatch } from "react-redux";
import { removeWishlist } from "../Redux/slices/wishlistSlice.js";
import "../Styles/Wishlist.css";

const Wishlist = () => {
  const wishlistItems = useSelector(
    store => store.wishlist
  );

  const dispatch = useDispatch();

  return (
    <div className="wishlistPage">
      <h1>My Wishlist ❤️</h1>

      {wishlistItems.length === 0 ? (
        <h2>No items in wishlist.</h2>
      ) : (
        wishlistItems.map(item => (
          <div
            className="wishlistCard"
            key={item.productName}
          >
            <img
              src={item.imgURL}
              alt={item.productName}
            />

            <div>
              <h3>{item.productName}</h3>

              <p>{item.brand}</p>

              <p>
                ⭐ {item.ratings}
              </p>
            </div>

            <button
              onClick={() =>
                dispatch(
                  removeWishlist(
                    item.productName
                  )
                )
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;