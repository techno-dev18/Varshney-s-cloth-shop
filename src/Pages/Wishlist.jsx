
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  removeFromWishlist
} from "../API/wishlistApi";

import "../Styles/Wishlist.css";

const Wishlist = () => {

  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET WISHLIST
  // ==========================================

  const fetchWishlist = async () => {

    const storedUser = localStorage.getItem("user");

    // User is not logged in
    if (!storedUser) {
      setWishlistItems([]);
      setLoading(false);
      navigate("/login");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await getWishlist();

      console.log("Wishlist API Response:", response.data);

      if (response.data.success) {

        const items = response.data.wishlistItems || [];

        // Remove invalid/deleted products
        const validItems = items.filter(
          (item) => item && item.product
        );

        setWishlistItems(validItems);

      } else {

        setWishlistItems([]);

        setError(
          response.data.message ||
          "Unable to load wishlist"
        );

      }

    } catch (error) {

      console.error(
        "Wishlist Error:",
        error
      );

      setWishlistItems([]);

      setError(
        error.response?.data?.message ||
        "Unable to load wishlist"
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // LOAD WISHLIST
  // ==========================================

  useEffect(() => {

    fetchWishlist();

  }, []);

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const handleRemove = async (wishlistId) => {

    try {

      await removeFromWishlist(wishlistId);

      // Immediately remove from UI
      setWishlistItems((previousItems) =>
        previousItems.filter(
          (item) => item._id !== wishlistId
        )
      );

      // Update header wishlist count
      window.dispatchEvent(
        new Event("wishlistUpdated")
      );

    } catch (error) {

      console.error(
        "Remove Wishlist Error:",
        error
      );

    }
  };

  // ==========================================
  // PRICE
  // ==========================================

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

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <section className="wishlistMessage">

        <div className="wishlistLoader">

          <span></span>

          <h2>
            Loading Wishlist
          </h2>

        </div>

      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <section className="wishlistMessage">

        <div className="wishlistError">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={fetchWishlist}
          >
            Try Again
          </button>

        </div>

      </section>
    );
  }

  // ==========================================
  // EMPTY WISHLIST
  // ==========================================

  if (wishlistItems.length === 0) {

    return (
      <section className="wishlistEmpty">

        <div className="emptyWishlistIcon">
          ♡
        </div>

        <h1>
          My Wishlist
        </h1>

        <h2>
          Your Wishlist is Empty
        </h2>

        <p>
          Save the products you love and
          come back to them anytime.
        </p>

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

  // ==========================================
  // WISHLIST
  // ==========================================

  return (

    <section className="wishlistPage">

      {/* HEADER */}

      <div className="wishlistHeader">

        <div>

          <span className="wishlistLabel">
            YOUR SAVED COLLECTION
          </span>

          <h1>
            My Wishlist
          </h1>

        </div>

        <p className="wishlistCount">

          {wishlistItems.length}

          {" "}

          {wishlistItems.length === 1
            ? "Product"
            : "Products"}

        </p>

      </div>


      {/* PRODUCTS */}

      <div className="wishlistGrid">

        {wishlistItems.map((item) => {

          const product = item.product;

          if (!product) {
            return null;
          }

          const sellingPrice =
            calculateSellingPrice(product);

          return (

            <article
              className="wishlistCard"
              key={item._id}
            >

              {/* IMAGE */}

              <div
                className="wishlistImage"
                onClick={() =>
                  navigate(
                    `/collection/item/${product.productName}`
                  )
                }
              >

                <img
                  src={product.imgURL}
                  alt={product.productName}
                />

                {Number(
                  product.discountPercentage
                ) > 0 && (

                  <span className="wishlistDiscount">

                    {product.discountPercentage}% OFF

                  </span>

                )}

              </div>


              {/* DETAILS */}

              <div className="wishlistDetails">

                <span className="wishlistBrand">
                  {product.brand}
                </span>

                <h2>
                  {product.productName}
                </h2>

                <div className="wishlistRating">

                  <span>
                    ★
                  </span>

                  {product.ratings}

                </div>


                {/* PRICE */}

                <div className="wishlistPrice">

                  <strong>
                    ₹{sellingPrice}
                  </strong>

                  {Number(
                    product.discountPercentage
                  ) > 0 && (

                    <del>
                      ₹{product.price}
                    </del>

                  )}

                </div>


                {/* ACTIONS */}

                <div className="wishlistActions">

                  <button
                    className="viewWishlistProduct"
                    onClick={() =>
                      navigate(
                        `/collection/item/${product.productName}`
                      )
                    }
                  >
                    View Product
                  </button>

                  <button
                    className="removeWishlist"
                    onClick={() =>
                      handleRemove(item._id)
                    }
                    aria-label={
                      `Remove ${product.productName} from wishlist`
                    }
                  >
                    ♡
                  </button>

                </div>

              </div>

            </article>

          );

        })}

      </div>

    </section>
  );
};

export default Wishlist;
