import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  removeFromWishlist
} from "../API/wishlistApi";

import "../Styles/Wishlist.css";


const Wishlist = () => {

  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // GET WISHLIST
  // ==========================================

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
        await getWishlist();

      console.log(
        "Wishlist:",
        response.data
      );

      if (response.data.success) {

        setWishlistItems(
          response.data.wishlistItems || []
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


  // ==========================================
  // LOAD WISHLIST
  // ==========================================

  useEffect(() => {

    fetchWishlist();

  }, []);


  // ==========================================
  // REMOVE ITEM
  // ==========================================

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
        "Remove Wishlist Error:",
        error
      );

    }

  };


  // ==========================================
  // PRICE
  // ==========================================

  const calculateSellingPrice = (
    product
  ) => {

    const price =
      Number(product.price) || 0;

    const discount =
      Number(
        product.discountPercentage
      ) || 0;

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

        <h2>
          Loading Wishlist...
        </h2>

      </section>
    );

  }


  // ==========================================
  // EMPTY
  // ==========================================

  if (wishlistItems.length === 0) {

    return (

      <section className="wishlistEmpty">

        <h1>
          My Wishlist ❤️
        </h1>

        <h2>
          Your Wishlist is Empty
        </h2>

        <p>
          Save your favorite products
          here and view them later.
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

      <h1>
        My Wishlist ❤️
      </h1>

      <p className="wishlistCount">

        {wishlistItems.length}{" "}

        {wishlistItems.length === 1
          ? "Product"
          : "Products"}

      </p>


      <div className="wishlistGrid">

        {wishlistItems.map(item => {

          const product =
            item.product;


          // Product may have been deleted

          if (!product) {
            return null;
          }


          const sellingPrice =
            calculateSellingPrice(
              product
            );


          return (

            <div
              className="wishlistCard"
              key={item._id}
            >

              {/* IMAGE */}

              <img
                src={product.imgURL}
                alt={
                  product.productName
                }
                onClick={() =>
                  navigate(
                    `/collection/item/${product.productName}`
                  )
                }
              />


              {/* DETAILS */}

              <div className="wishlistDetails">

                <h2>
                  {product.productName}
                </h2>


                <p className="wishlistBrand">
                  {product.brand}
                </p>


                <p className="wishlistRating">
                  ⭐ {product.ratings}
                </p>


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


                {/* BUTTONS */}

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