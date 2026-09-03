import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaArrowLeft
} from "react-icons/fa";

import "../Styles/ProductDetails.css";

const API_URL =
  "https://varshney-s-cloth-shop.onrender.com/api";

const ProductDetails = () => {

  const {
    itemName
  } = useParams();

  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==============================
  // FETCH PRODUCTS
  // ==============================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          `${API_URL}/products`
        );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            "Unable to load products"
          );

        }

        setProducts(
          data.products || data
        );

      } catch (err) {

        console.error(
          "Product Fetch Error:",
          err
        );

        setError(
          "Unable to load product"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <section className="detailsMessage">

        <h2>
          Loading Product...
        </h2>

      </section>
    );

  }


  // ==============================
  // ERROR
  // ==============================

  if (error) {

    return (
      <section className="detailsMessage">

        <h2>
          {error}
        </h2>

        <button
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>

      </section>
    );

  }


  // ==============================
  // FIND PRODUCT
  // ==============================

  const selectedProduct =
    products.find(
      product =>
        product.productName ===
        itemName
    );


  // ==============================
  // PRODUCT NOT FOUND
  // ==============================

  if (!selectedProduct) {

    return (
      <section className="detailsMessage">

        <h1>
          Product Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>

      </section>
    );

  }


  // ==============================
  // CURRENT SIZE
  // ==============================

  const currentSize =
    selectedSize ||
    selectedProduct.sizes?.[0] ||
    "";


  // ==============================
  // DISCOUNTED PRICE
  // ==============================

  const finalPrice =
    Math.round(
      selectedProduct.price -
      (
        selectedProduct.price *
        selectedProduct.discountPercentage
      ) / 100
    );


  // ==============================
  // ADD TO CART
  // ==============================

  const addToCart = async () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      alert(
        "Please login before adding products to basket"
      );

      return;

    }


    try {

      const response =
        await fetch(
          `${API_URL}/cart`,
          {
            method: "POST",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              productId:
                selectedProduct._id,

              selectedSize:
                currentSize

            })

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Failed to add product"
        );

        return;

      }


      window.dispatchEvent(
        new Event("cartUpdated")
      );


      alert(
        "Product added to basket!"
      );


    } catch (error) {

      console.error(
        "CART ERROR:",
        error
      );

      alert(
        "Unable to connect to server"
      );

    }

  };


  // ==============================
  // PAGE
  // ==============================

  return (

    <section className="detailsPage">


      {/* ==========================
          BACK TO DASHBOARD
      ========================== */}

      <button
        type="button"
        className="backToDashboard"
        onClick={() =>
          navigate("/")
        }
        title="Back to Dashboard"
        aria-label="Back to Dashboard"
      >

        <FaArrowLeft />

      </button>


      {/* ==========================
          PRODUCT CONTAINER
      ========================== */}

      <div className="detailsContainer">


        {/* ==========================
            PRODUCT IMAGE
        ========================== */}

        <div className="imageSide">

          <img
            src={selectedProduct.imgURL}
            alt={
              selectedProduct.productName
            }
          />

        </div>


        {/* ==========================
            PRODUCT INFORMATION
        ========================== */}

        <div className="infoSide">


          <span className="category">

            {selectedProduct.category}

          </span>


          <h1>

            {selectedProduct.productName}

          </h1>


          <p className="tagline">

            {selectedProduct.tagline}

          </p>


          {/* RATING */}

          <div className="rating">

            ⭐ {selectedProduct.ratings}

            <span>
              / 5
            </span>

          </div>


          {/* PRICE */}

          <div className="priceBox">

            <span className="old">

              ₹{selectedProduct.price}

            </span>

            <span className="new">

              ₹{finalPrice}

            </span>

            <span className="discount">

              {selectedProduct.discountPercentage}%
              OFF

            </span>

          </div>


          {/* DESCRIPTION */}

          <p className="description">

            {selectedProduct.description}

          </p>


          {/* SIZE */}

          <div className="sizeSection">

            <label>
              Select Size
            </label>

            <select
              value={currentSize}
              onChange={(e) =>
                setSelectedSize(
                  e.target.value
                )
              }
            >

              {selectedProduct.sizes?.map(
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


          {/* FEATURES */}

          <div className="productSection">

            <h3>
              Features
            </h3>

            <ul>

              {selectedProduct.features?.map(
                feature => (

                  <li key={feature}>

                    {feature}

                  </li>

                )
              )}

            </ul>

          </div>


          {/* DETAILS */}

          <div className="productSection">

            <h3>
              Details
            </h3>

            <ul>

              {selectedProduct.details?.map(
                detail => (

                  <li key={detail}>

                    {detail}

                  </li>

                )
              )}

            </ul>

          </div>


          {/* ADD TO BASKET */}

          <button
            type="button"
            className="addBasketButton"
            onClick={addToCart}
          >

            Add To Basket

          </button>

        </div>

      </div>

    </section>

  );

};

export default ProductDetails;