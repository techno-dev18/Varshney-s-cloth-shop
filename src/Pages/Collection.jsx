import { useParams } from "react-router-dom";

import { useState } from "react";

import ClothCard from "../Components/ClothCard";

import {
  products,
  categories
} from "../Data/clothData";

import "../Styles/Collection.css";

const Collection = () => {

  const { categoryName } = useParams();
  const [sortType, setSortType] =
  useState("");
  const [allItems] =
    useState(products);

  const [keyword, setKeyword] =
    useState("");

  const [selectedGender, setSelectedGender] =
    useState("");

  const [minimumRating, setMinimumRating] =
    useState(0);

  const [chosenCategories,
    setChosenCategories] =
    useState([]);

  const filterItems = () => {

    let data = [...allItems];

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
                      category.categoryName
                    }
                  >

                    <input
                      type="checkbox"
                      checked={
                        chosenCategories.includes(
                          category.categoryName
                        )
                      }
                      onChange={() =>
                        toggleCategory(
                          category.categoryName
                        )
                      }
                    />

                    {
                      category.categoryName
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