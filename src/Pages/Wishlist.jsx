import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  removeFromWishlist
} from "../API/wishlistApi";

import "../Styles/Wishlist.css";

const Wishlist = () => {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH WISHLIST
  // ===============================

  const fetchWishlist = async () => {

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
        await getWishlist(user.id);

      console.log(
        "Wishlist from MongoDB:",
        response.data
      );

      if (response.data.success) {

        setWishlist(
          response.data.wishlist || []
        );

      }

    } catch (error) {

      console.error(
        "Wishlist Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // ===============================
  // LOAD WISHLIST
  // ===============================

  useEffect(() => {

    fetchWishlist();

  }, []);


  // ===============================
  // REMOVE PRODUCT
  // ===============================

  const handleRemove = async (
    wishlistId
  ) => {

    try {

      await removeFromWishlist(
        wishlistId
      );

      await fetchWishlist();

    } catch (error) {

      console.error(
        "Remove wishlist error:",
        error
      );

    }

  };


  // ===============================
  // LOADING
  // ===============================

  if (loading) {

    return (
      <section className="wishlistMessage">

        <h2>
          Loading Wishlist...
        </h2>

      </section>
    );

  }


  // ===============================
  // EMPTY
  // ===============================

  if (wishlist.length === 0) {

    return (
      <section className="wishlistEmpty">

        <h1>
          My Wishlist
        </h1>

        <h2>
          Your Wishlist is Empty
        </h2>

        <p>
          Add products you love to
          your wishlist.
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


  // ===============================
  // UI
  // ===============================

  return (

    <section className="wishlistPage">

      <h1>
        My Wishlist
      </h1>

      <div className="wishlistGrid">

        {wishlist.map(item => {

          const product =
            item.product;

          if (!product) {
            return null;
          }

          const price =
            Number(product.price) || 0;

          const discount =
            Number(
              product.discountPercentage
            ) || 0;

          const sellingPrice =
            Math.round(
              price -
              (price * discount) / 100
            );

          return (

            <div
              className="wishlistCard"
              key={item._id}
            >

              <img
                src={product.imgURL}
                alt={
                  product.productName
                }
              />

              <div className="wishlistDetails">

                <h3>
                  {product.productName}
                </h3>

                <p>
                  {product.brand}
                </p>

                <p>
                  ⭐ {product.ratings}
                </p>

                <div className="wishlistPrice">

                  <strong>
                    ₹{sellingPrice}
                  </strong>

                  {discount > 0 && (

                    <del>
                      ₹{price}
                    </del>

                  )}

                </div>


                <div className="wishlistActions">

                  <button
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
                      handleRemove(
                        item._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

};

export default Wishlist;