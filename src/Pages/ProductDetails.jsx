import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import "../Styles/ProductDetails.css";

const API_URL =
  "https://varshney-s-cloth-shop.onrender.com/api";

const ProductDetails = () => {

  const { itemName } = useParams();

  const [products, setProducts] =
    useState([]);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Fetch products from MongoDB
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

        /*
          Your API may return:

          {
            success: true,
            products: [...]
          }

          OR directly:

          [...]
        */

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

  // Loading
  if (loading) {
    return (
      <h2>
        Loading Product...
      </h2>
    );
  }

  // Error
  if (error) {
    return (
      <h2>
        {error}
      </h2>
    );
  }

  // Find selected product
  const selectedProduct =
    products.find(
      product =>
        product.productName ===
        itemName
    );

  // Product doesn't exist
  if (!selectedProduct) {
    return (
      <h1>
        Product Not Found
      </h1>
    );
  }

  // Set first size if no size selected
  const currentSize =
    selectedSize ||
    selectedProduct.sizes?.[0] ||
    "";

  // Calculate discounted price
  const finalPrice =
    Math.round(
      selectedProduct.price -
      (
        selectedProduct.price *
        selectedProduct.discountPercentage
      ) / 100
    );

  // Add product to MongoDB cart
  const addToCart = async () => {

    const storedUser =
      localStorage.getItem("user");

    // User must login
    if (!storedUser) {

      alert(
        "Please login before adding products to basket"
      );

      return;
    }

    const user =
      JSON.parse(storedUser);

    // Check required IDs
    if (!user.id) {

      alert(
        "User information is missing. Please login again."
      );

      return;
    }

    if (!selectedProduct._id) {

      alert(
        "Product ID is missing."
      );

      return;
    }

    try {

      const response =
        await fetch(
          `${API_URL}/cart`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              userId: user.id,

              productId:
                selectedProduct._id,

              selectedSize:
                currentSize
            })
          }
        );

      const data =
        await response.json();

      console.log(
        "Cart Response:",
        data
      );

      if (!response.ok) {

        alert(
          data.message ||
          "Failed to add product to basket"
        );

        return;
      }

      alert(
        "Product added to basket!"
      );

    } catch (error) {

      console.error(
        "Cart Error:",
        error
      );

      alert(
        "Unable to connect to server"
      );
    }
  };

  return (

    <section className="detailsPage">

      <div className="detailsContainer">

        {/* PRODUCT IMAGE */}

        <div className="imageSide">

          <img
            src={selectedProduct.imgURL}
            alt={
              selectedProduct.productName
            }
          />

        </div>


        {/* PRODUCT INFORMATION */}

        <div className="infoSide">

          <span className="category">

            {selectedProduct.category}

          </span>


          <h1>

            {selectedProduct.productName}

          </h1>


          <p>

            {selectedProduct.tagline}

          </p>


          <h3>

            ⭐ {selectedProduct.ratings}

          </h3>


          {/* PRICE */}

          <div className="priceBox">

            <span className="old">

              ₹{selectedProduct.price}

            </span>

            <span className="new">

              ₹{finalPrice}

            </span>

          </div>


          {/* DESCRIPTION */}

          <p>

            {selectedProduct.description}

          </p>


          {/* SIZE */}

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


          {/* FEATURES */}

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


          {/* DETAILS */}

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


          {/* ADD TO CART */}

          <button
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