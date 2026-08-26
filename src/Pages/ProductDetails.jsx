import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../Styles/ProductDetails.css";

const API_URL =
  "https://varshney-s-cloth-shop.onrender.com/api";

const ProductDetails = () => {

  const { itemName } = useParams();

  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] =
    useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then(data => {

        setProducts(data.products || data);
        setLoading(false);

      })
      .catch(error => {

        console.error(error);
        setLoading(false);

      });

  }, []);

  if (loading) {
    return <h2>Loading Product...</h2>;
  }

  const selectedProduct = products.find(
    product =>
      product.productName === itemName
  );

  if (!selectedProduct) {
    return <h1>Product Not Found</h1>;
  }

  const finalPrice = Math.round(
    selectedProduct.price -
    (
      selectedProduct.price *
      selectedProduct.discountPercentage
    ) / 100
  );

  const addToCart = async () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login before adding items to basket");
      return;
    }

    const user = JSON.parse(storedUser);

    try {

      const response = await fetch(
        `${API_URL}/cart`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            userId: user.id,
            productId: selectedProduct._id,
            selectedSize:
              selectedSize ||
              selectedProduct.sizes[0]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Failed to add product"
        );
        return;
      }

      alert("Product added to basket!");

    } catch (error) {

      console.error(error);

      alert("Unable to connect to server");
    }
  };

  return (
    <section className="detailsPage">

      <div className="detailsContainer">

        <div className="imageSide">

          <img
            src={selectedProduct.imgURL}
            alt={selectedProduct.productName}
          />

        </div>

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

          <div className="priceBox">

            <span className="old">
              ₹{selectedProduct.price}
            </span>

            <span className="new">
              ₹{finalPrice}
            </span>

          </div>

          <p>
            {selectedProduct.description}
          </p>

          <select
            value={selectedSize}
            onChange={(e) =>
              setSelectedSize(e.target.value)
            }
          >

            <option value="">
              Select Size
            </option>

            {selectedProduct.sizes.map(size => (
              <option
                key={size}
                value={size}
              >
                {size}
              </option>
            ))}

          </select>

          <h3>Features</h3>

          <ul>
            {selectedProduct.features.map(
              feature => (
                <li key={feature}>
                  {feature}
                </li>
              )
            )}
          </ul>

          <h3>Details</h3>

          <ul>
            {selectedProduct.details.map(
              detail => (
                <li key={detail}>
                  {detail}
                </li>
              )
            )}
          </ul>

          <button onClick={addToCart}>
            Add To Basket
          </button>

        </div>

      </div>

    </section>
  );
};

export default ProductDetails;