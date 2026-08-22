import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { insertProduct } from "../Redux/slices/basketSlice";

import "../Styles/ProductDetails.css";

const ProductDetails = () => {

  const dispatch = useDispatch();

  const { itemName } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] =
    useState("");


  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        setError("");

        const response = await fetch(
          `http://localhost:5000/api/products/${encodeURIComponent(itemName)}`
        );

        if (!response.ok) {

          throw new Error(
            "Product could not be fetched"
          );

        }

        const data =
          await response.json();

        console.log(
          "Product from MongoDB:",
          data
        );

        if (data.success) {

          setProduct(data.product);

          if (
            data.product.sizes &&
            data.product.sizes.length > 0
          ) {

            setSelectedSize(
              data.product.sizes[0]
            );

          }

        } else {

          setError(
            "Product not found"
          );

        }

      } catch (error) {

        console.error(
          "Error fetching product:",
          error
        );

        setError(
          "Unable to load product."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [itemName]);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="loading">

        <h2>
          Loading Product...
        </h2>

      </div>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (error || !product) {

    return (
      <div className="error-message">

        <h1>
          Product Not Found
        </h1>

        <p>
          {error}
        </p>

      </div>
    );

  }


  // =========================
  // PRICE
  // =========================

  const finalPrice =
    Math.round(
      product.price -
      (
        product.price *
        product.discountPercentage
      ) / 100
    );


  // =========================
  // ADD TO BASKET
  // =========================

  const handleAddToBasket = () => {

    const productToAdd = {

      ...product,

      selectedSize

    };

    dispatch(
      insertProduct(
        productToAdd
      )
    );

  };


  // =========================
  // UI
  // =========================

  return (

    <section className="detailsPage">

      <div className="detailsContainer">


        {/* IMAGE */}

        <div className="imageSide">

          <img
            src={product.imgURL}
            alt={product.productName}
          />

        </div>


        {/* INFORMATION */}

        <div className="infoSide">

          <span className="category">

            {product.category}

          </span>


          <h1>

            {product.productName}

          </h1>


          <p>

            {product.tagline}

          </p>


          <h3>

            ⭐ {product.ratings}

          </h3>


          {/* PRICE */}

          <div className="priceBox">

            <span className="old">

              ₹{product.price}

            </span>

            <span className="new">

              ₹{finalPrice}

            </span>

          </div>


          {/* DESCRIPTION */}

          <p>

            {product.description}

          </p>


          {/* SIZE */}

          {product.sizes &&
            product.sizes.length > 0 && (

            <div>

              <h3>
                Select Size
              </h3>

              <select
                value={selectedSize}
                onChange={e =>
                  setSelectedSize(
                    e.target.value
                  )
                }
              >

                {product.sizes.map(
                  size => (

                    <option
                      key={size}
                      value={size}
                    >
                      {size}
                    </option>

                  )
                )}

              </select>

            </div>

          )}


          {/* FEATURES */}

          <h3>
            Features
          </h3>

          <ul>

            {product.features?.map(
              feature => (

                <li key={feature}>

                  {feature}

                </li>

              )
            )}

          </ul>


          {/* DETAILS */}

          <h3>
            Details
          </h3>

          <ul>

            {product.details?.map(
              detail => (

                <li key={detail}>

                  {detail}

                </li>

              )
            )}

          </ul>


          {/* ADD TO BASKET */}

          <button
            onClick={
              handleAddToBasket
            }
          >

            Add To Basket

          </button>

        </div>

      </div>

    </section>

  );

};

export default ProductDetails;