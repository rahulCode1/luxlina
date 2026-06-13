import { useState, useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProductsList = ({ productsList }) => {
  const [changePrice, setChangePrice] = useState(5000);
  const [category, setCategory] = useState([]);
  const [productRating, setProductRating] = useState(0);

  const ratingArr = [
    { name: "4 Stars & Above", value: 4, id: "4star", radioName: "rating" },
    { name: "3 Stars & Above", value: 3, id: "3star", radioName: "rating" },
    { name: "2 Stars & Above", value: 2, id: "2star", radioName: "rating" },
    { name: "1 Stars & Above", value: 1, id: "1star", radioName: "rating" },
  ];

  const [sortBy, setSortBy] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const productCategory = searchParams.get("category") || "";
  const searchProductText = searchParams.get("search") || "";

  // Sync URL category with checkbox state when component mounts or URL changes
  useEffect(() => {
    if (productCategory && !category.includes(productCategory)) {
      setCategory([productCategory]);
    }
  }, [productCategory, category]);

  const searchedProduct =
    searchProductText === ""
      ? productsList
      : productsList.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(searchProductText.toLowerCase()) ||
            product.category
              .toLowerCase()
              .includes(searchProductText.toLowerCase()) ||
            product.keywords
              .toLowerCase()
              .includes(searchProductText.toLowerCase()) ||
            product.tags.some((tag) =>
              tag.toLowerCase().includes(searchProductText.toLowerCase()),
            ),
        );

  const priceFilter = searchedProduct.filter(
    (product) => Number(product.discountPrice) <= Number(changePrice),
  );

  const categoryFilter =
    category.length === 0
      ? priceFilter
      : priceFilter.filter((product) => category.includes(product.category));

  const ratingFilter =
    productRating === 0
      ? categoryFilter
      : categoryFilter.filter((product) => product.rating >= productRating);

  const handleOnChangeCategory = (e) => {
    const { checked, value } = e.target;

    if (value === searchParams.get("category")) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }

    if (checked) {
      setCategory((prevStat) => [...prevStat, value]);
    } else {
      setCategory((prevStat) =>
        prevStat.filter((category) => category !== value),
      );
    }
  };

  const sortedArray = [...ratingFilter];

  if (sortBy === "HighToLow") {
    sortedArray.sort(
      (a, b) => Number(b.discountPrice) - Number(a.discountPrice),
    );
  } else if (sortBy === "LowToHigh") {
    sortedArray.sort(
      (a, b) => Number(a.discountPrice) - Number(b.discountPrice),
    );
  }

  const handleClearFilter = () => {
    const toastId = toast.loading("removing filters...");
    setChangePrice(5000);
    setCategory([]);

    searchParams.delete("category");
    searchParams.delete("search");
    setSearchParams(searchParams);
    setSortBy("");
    setProductRating(0);
    toast.success("All filters removed", { id: toastId });
  };
  return (
    <>
      <main className="px-2">
        <div className="row position-relative ">
          <div className="text-end  position-absolute d-block d-md-none">
            <button
              className="btn p-2 bg-transparent border-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
            >
              Filters <i className="bi bi-funnel fs-4"></i>
            </button>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasResponsive"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>

            <div className="offcanvas-body">
              <div className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <strong>Filters</strong>
                  <button
                    onClick={handleClearFilter}
                    className="btn btn-sm btn-outline-dark"
                  >
                    Clear All
                  </button>
                </div>

                <div className="py-3 border-bottom">
                  <label htmlFor="range-mobile" className="form-label">
                    <strong>Price: </strong>₹ {changePrice}
                  </label>
                  <input
                    type="range"
                    step={50}
                    min={0}
                    max={5000}
                    onChange={(e) => setChangePrice(Number(e.target.value))}
                    value={changePrice}
                    className="form-range"
                    id="range-mobile"
                  />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">₹0</small>
                    <small className="text-muted">₹5000</small>
                  </div>
                </div>

                <div className="border-bottom">
                  <CategoryFilter
                    handleOnChangeCategory={handleOnChangeCategory}
                    filterCategory={category}
                  />
                </div>

                <div className="py-3">
                  <label htmlFor="rating">
                    <strong>Rating</strong>
                  </label>
                  {ratingArr.map((rating) => (
                    <div className="form-check" key={rating.id}>
                      <input
                        type="radio"
                        id={rating.id}
                        name={rating.radioName}
                        value={rating.value}
                        checked={Math.floor(rating.value) === productRating}
                        onChange={(e) =>
                          setProductRating(Number(e.target.value))
                        }
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={rating.id}>
                        {rating.name}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="py-3">
                  <label className="form-label mb-3">
                    <strong>Sort by</strong>
                  </label>
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      value={"HighToLow"}
                      checked={sortBy === "HighToLow"}
                      id="HighToLow-mobile"
                      className="form-check-input"
                      name="sort-mobile"
                      onChange={(e) => setSortBy(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="HighToLow-mobile"
                    >
                      Price: High to Low
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      checked={sortBy === "LowToHigh"}
                      id="LowToHigh-mobile"
                      value={"LowToHigh"}
                      className="form-check-input"
                      name="sort-mobile"
                      onChange={(e) => setSortBy(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="LowToHigh-mobile"
                    >
                      Price: Low to High
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 d-none d-md-block border-end bg-white">
            <section className="p-3 sticky-top" style={{ top: "20px" }}>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <strong
                  className="text-uppercase"
                  style={{ letterSpacing: "1px", fontSize: "0.9rem" }}
                >
                  Filters
                </strong>
                <button
                  onClick={handleClearFilter}
                  className="btn btn-sm btn-link text-decoration-none text-dark"
                >
                  Clear All
                </button>
              </div>

              <div className="py-3 border-bottom">
                <label htmlFor="range-desktop" className="form-label mb-3">
                  <strong>Price: </strong>
                  <span className="text-success fw-bold">₹{changePrice}</span>
                </label>
                <input
                  type="range"
                  step={50}
                  min={0}
                  max={5000}
                  onChange={(e) => setChangePrice(Number(e.target.value))}
                  value={changePrice}
                  className="form-range"
                  id="range-desktop"
                />
                <div className="d-flex justify-content-between mt-2">
                  <small className="text-muted">₹0</small>
                  <small className="text-muted">₹5000</small>
                </div>
              </div>

              <div className="border-bottom">
                <CategoryFilter
                  handleOnChangeCategory={handleOnChangeCategory}
                  filterCategory={category}
                />
              </div>

              <div className="py-3">
                <label htmlFor="rating">
                  <strong>Rating</strong>
                </label>
                {ratingArr.map((rating) => (
                  <div className="form-check" key={rating.id}>
                    <input
                      type="radio"
                      id={rating.id}
                      name={rating.radioName}
                      value={rating.value}
                      checked={rating.value === Number(productRating)}
                      onChange={(e) => setProductRating(e.target.value)}
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor={rating.id}>
                      {rating.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="py-3">
                <label className="form-label mb-3">
                  <strong>Sort by</strong>
                </label>
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    value={"HighToLow"}
                    checked={sortBy === "HighToLow"}
                    id="HighToLow-desktop"
                    className="form-check-input"
                    name="sort-desktop"
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="HighToLow-desktop"
                  >
                    Price: High to Low
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    checked={sortBy === "LowToHigh"}
                    id="LowToHigh-desktop"
                    value={"LowToHigh"}
                    className="form-check-input"
                    name="sort-desktop"
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="LowToHigh-desktop"
                  >
                    Price: Low to High
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div className="col-md-9 bg-light min-vh-100 p-3 pb-5 mb-5 mb-md-0">
            <section>
              <div className="row">
                {sortedArray && (
                  <div className="mb-4">
                    <h5 className="fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
                      All Products
                    </h5>
                    <span className="text-muted">
                      Showing {sortedArray.length} products
                    </span>
                  </div>
                )}

                {sortedArray &&
                  sortedArray.length !== 0 &&
                  sortedArray.map((product) => (
                    <div
                      key={product.id}
                      className="col-12 col-sm-6 col-md-4 mb-4"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsList;
