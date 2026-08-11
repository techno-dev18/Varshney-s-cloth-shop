import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import ClothCard from "../Components/ClothCard";


import { getAllProducts } from "../API/productApi";
import "../Styles/Collection.css";
const [products, setProducts] = useState([]);
useEffect(() => {

  const fetchProducts = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }

    } catch (error) {

      console.error(
        "Failed to fetch products:",
        error
      );

    }
  };

  fetchProducts();

}, []);
const Collection = () => {

  const { categoryName } = useParams();
  const [sortType, setSortType] =
  useState("");
 const [products, setProducts] = useState([]);
 useEffect(() => {

    loadProducts();

}, []);

  const [keyword, setKeyword] =
    useState("");

  const [selectedGender, setSelectedGender] =
    useState("");

  const [minimumRating, setMinimumRating] =
    useState(0);

  const [chosenCategories,
    setChosenCategories] =
    useState([]);
const loadProducts = async () => {

    try {

        const response = await getAllProducts();

        setProducts(response.data.products);

    }

    catch (error) {

        console.log(error);

    }

};
  const filterItems = () => {

    let data = [...products];

    if (categoryName) {
      data = data.filter(
        item =>
          item.category.toLowerCase() ===
          categoryName.toLowerCase()
      );
    }

    if (keyword) {
      data = data.filter(item =>
        item.productName
          .toLowerCase()
          .includes(
            keyword.toLowerCase()
          )
      );
    }

    if (selectedGender) {
      data = data.filter(
        item =>
          item.gender ===
          selectedGender
      );
    }

    data = data.filter(
      item =>
        item.ratings >= minimumRating
    );

    if (
      chosenCategories.length > 0 &&
      !categoryName
    ) {
      data = data.filter(item =>
        chosenCategories.includes(
          item.category
        )
      );
    }
if (sortType === "low") {

    data.sort(
        (a, b) => a.price - b.price
    );

}

if (sortType === "high") {

    data.sort(
        (a, b) => b.price - a.price
    );

}

if (sortType === "rating") {

    data.sort(
        (a, b) => b.ratings - a.ratings
    );

}
    return data;
  };

  const toggleCategory =
    category => {

      if (
        chosenCategories.includes(category)
      ) {
        setChosenCategories(
          chosenCategories.filter(
            item =>
              item !== category
          )
        );
      } else {
        setChosenCategories([
          ...chosenCategories,
          category
        ]);
      }
    };
const categories = [
  ...new Set(
    products.map(item => item.category)
  )
];
  return (
    <>
      <section className="collectionHead">

        <h2>
          {
            categoryName
            ? categoryName
            : "All Collection"
          }
        </h2>

        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={e =>
            setKeyword(
              e.target.value
            )
          }
        />

      </section>

      <section className="layout">

        <aside className="filters">

          <h3>Filters</h3>

          <div>

            <h4>Gender</h4>

            <label>
              <input
                type="radio"
                value=""
                checked={
                  selectedGender === ""
                }
                onChange={e =>
                  setSelectedGender(
                    e.target.value
                  )
                }
              />
              All
            </label>

            <label>
              <input
                type="radio"
                value="male"
                checked={
                  selectedGender === "male"
                }
                onChange={e =>
                  setSelectedGender(
                    e.target.value
                  )
                }
                
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                value="female"
                checked={
                  selectedGender === "female"
                }
                onChange={e =>
                  setSelectedGender(
                    e.target.value
                  )
                }
              />
              Female
            </label>

          </div>

          <div>

            <h4>Rating</h4>

            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minimumRating}
              onChange={e =>
                setMinimumRating(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <p>
              {minimumRating}
              ⭐ & Above
            </p>

          </div>
          <select
  onChange={e =>
    setSortType(e.target.value)
  }
>
  <option value="">
    Sort
  </option>

  <option value="low">
    Low Price
  </option>

  <option value="high">
    High Price
  </option>

  <option value="rating">
    Rating
  </option>
</select>
          {!categoryName && (

            <div>

              <h4>Categories</h4>

              {
                categories.map(category => (

                  <label
                    key={
                      category
                    }
                  >

                    <input
                      type="checkbox"
                      checked={
                        chosenCategories.includes(
                          category
                        )
                      }
                      onChange={() =>
                        toggleCategory(
                          category
                        )
                      }
                    />

                    {
                      category
                    }

                  </label>

                ))
              }

            </div>

          )}

        </aside>

        <div className="productArea">

          {
            filterItems().length > 0 ?

            filterItems().map(item => (

              <ClothCard
                key={item.productName}
                item={item}
              />

            ))

            :

            <h2>
              No Products Found
            </h2>
          }

        </div>

      </section>
    </>
  );
};

export default Collection;