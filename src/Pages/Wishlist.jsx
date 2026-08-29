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
  // FETCH WISHLIST
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
        await getWishlist(user.id);


      console.log(
        "Wishlist from MongoDB:",
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
  // REMOVE FROM WISHLIST
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
  // EMPTY WISHLIST
  // ==========================================

  if (wishlistItems.length === 0) {

    return (

      <section className="wishlistEmpty">

       
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
  // DISPLAY WISHLIST
  // ==========================================

  return (

    <section className="wishlistPage">

      <h1>
      Wishlist ❤️
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

              {/* PRODUCT IMAGE */}

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


              {/* PRODUCT INFORMATION */}

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


                  {discount > 0 && (

                    <del>
                      ₹{price}
                    </del>

                  )}

                </div>


                {/* ACTIONS */}

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