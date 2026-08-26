import ShimmerCard from "../Components/ShimmerCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClothCard from "../Components/ClothCard";
import { getAllProducts } from "../API/productApi";
import "../Styles/Collection.css";
// import "../Styles/ShimmerCard.css";
const Collection = () => {

  const { categoryName } = useParams();

  // Products received from MongoDB
  const [products, setProducts] = useState([]);

  // UI states
  const [keyword, setKeyword] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);
  const [chosenCategories, setChosenCategories] = useState([]);
  const [sortType, setSortType] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET PRODUCTS FROM BACKEND
  // =========================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await getAllProducts();

        console.log("Products from MongoDB:", response.data);

        setProducts(
          response.data.products || []
        );

      } catch (error) {

        console.error(
          "Failed to fetch products:",
          error
        );

        setError(
          "Unable to load products."
        );

      } finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, []);

  // =========================
  // CATEGORIES FROM MONGODB
  // =========================

  const categories = [
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filterItems = () => {

    let data = [...products];

    // Category from URL

    if (categoryName) {

      data = data.filter(
        item =>
          item.category?.toLowerCase() ===
          categoryName.toLowerCase()
      );

    }

    // Search

    if (keyword) {

      data = data.filter(
        item =>
          item.productName
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase()
            )
      );

    }

    // Gender

    if (selectedGender) {

      data = data.filter(
        item =>
          item.gender ===
          selectedGender
      );

    }

    // Rating

    data = data.filter(
      item =>
        Number(item.ratings) >=
        minimumRating
    );

    // Categories

    if (
      chosenCategories.length > 0 &&
      !categoryName
    ) {

      data = data.filter(
        item =>
          chosenCategories.includes(
            item.category
          )
      );

    }

    // =========================
    // SORTING
    // =========================

    if (sortType === "low") {

      data.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );

    }

    if (sortType === "high") {

      data.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );

    }

    if (sortType === "rating") {

      data.sort(
        (a, b) =>
          Number(b.ratings) -
          Number(a.ratings)
      );

    }

    return data;

  };

  // =========================
  // CATEGORY CHECKBOX
  // =========================

  const toggleCategory = category => {

    if (
      chosenCategories.includes(
        category
      )
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

  // =========================
  // LOADING
  // =========================

if (loading) {

  return (
    <div className="productArea">

      {Array.from({ length: 8 }).map((_, index) => (
        <ShimmerCard key={index} />
      ))}

    </div>
  );

}

  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div className="error-message">

        <h2>{error}</h2>

        <p>
          Make sure your Express server
          is running on port 5000.
        </p>

      </div>
    );

  }

  const displayedProducts =
    filterItems();

  // =========================
  // UI
  // =========================

  return (
    <>

      <section className="collectionHead">

        <h2>

          {categoryName
            ? categoryName
            : "All Collection"}

        </h2>

        <input
          type="text"
          placeholder="Search Products..."
          value={keyword}
          onChange={e =>
            setKeyword(
              e.target.value
            )
          }
        />

      </section>


      <section className="layout">

        {/* =====================
            FILTERS
        ===================== */}

        <aside className="filters">

          <h3>Filters</h3>


          {/* GENDER */}

          <div>

            <h4>Gender</h4>

            <label>

              <input
                type="radio"
                name="gender"
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
                name="gender"
                value="male"
                checked={
                  selectedGender ===
                  "male"
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
                name="gender"
                value="female"
                checked={
                  selectedGender ===
                  "female"
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


          {/* RATING */}

          <div>

            <h4>
              Minimum Rating
            </h4>

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


          {/* SORT */}

          <div>

            <h4>
              Sort Products
            </h4>

            <select
              value={sortType}
              onChange={e =>
                setSortType(
                  e.target.value
                )
              }
            >

              <option value="">
                Default
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

            </select>

          </div>


          {/* CATEGORIES */}

          {!categoryName && (

            <div>

              <h4>
                Categories
              </h4>

              {categories.map(
                category => (

                  <label
                    key={category}
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

                    {category}

                  </label>

                )
              )}

            </div>

          )}

        </aside>


        {/* =====================
            PRODUCTS
        ===================== */}

        <div className="productArea">

          {displayedProducts.length >
          0 ? (

            displayedProducts.map(
              item => (

                <ClothCard
                  key={
                    item._id ||
                    item.productName
                  }
                  item={item}
                />

              )
            )

          ) : (

            <div>

              <h2>
                No Products Found
              </h2>

              <p>
                Try changing your
                filters or search.
              </p>

            </div>

          )}

        </div>

      </section>

    </>
  );

};

export default Collection;