import { useParams } from "react-router-dom";

import { products }
    from "../Data/clothData";
import {
    useDispatch
}
    from "react-redux";

import {
    insertProduct
}
    from "../Redux/slices/basketSlice";
import "../Styles/ProductDetails.css";
const ClothCard = ({ item }) => {

    const dispatch = useDispatch();
  
    
  }
const ProductDetails = () => {

    const { itemName } =
        useParams();

    const selectedProduct =
        products.find(
            product =>
                product.productName ===
                itemName
        );

    if (!selectedProduct) {
        return <h1>Product Not Found</h1>;
    }

    const finalPrice =
        Math.round(
            selectedProduct.price -
            (
                selectedProduct.price *
                selectedProduct.discountPercentage
            ) / 100
        );

    return (
        <section className="detailsPage">

            <div className="detailsContainer">

                <div className="imageSide">

                    <img
                        src={selectedProduct.imgURL}
                        alt=""
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

                    <select>

                        {
                            selectedProduct.sizes.map(
                                size => (
                                    <option key={size}>
                                        {size}
                                    </option>
                                )
                            )
                        }

                    </select>

                    <h3>Features</h3>

                    <ul>
                        {
                            selectedProduct.features.map(
                                feature => (
                                    <li key={feature}>
                                        {feature}
                                    </li>
                                )
                            )
                        }
                    </ul>

                    <h3>Details</h3>

                    <ul>
                        {
                            selectedProduct.details.map(
                                detail => (
                                    <li key={detail}>
                                        {detail}
                                    </li>
                                )
                            )
                        }
                    </ul>

                    <button
                        onClick={() =>
                            dispatch(
                                insertProduct(
                                    selectedProduct
                                )
                            )
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