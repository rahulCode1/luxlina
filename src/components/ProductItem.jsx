import { Link, useParams, useNavigate } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import ProductImageCarousel from "./ProductImageCarousel";

import COD from "../imgs/COD.png";
import free from "../imgs/free.png";
import payment from "../imgs/payment.png";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../utils/axios";
import ErrorModal from "./ErrorModal";

const ProductItem = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    user,
    error,
    setError,
    productCart,
    wishlist,
    handleAddToWishList,
    handleRemoveToWishList,
    handleAddToCart,
  } = useEcommerce();
  const navigate = useNavigate();
  const productId = useParams()?.id;

  const productInfo = productData.data.product;
  const similarProducts = productData.data.similarProducts;

  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product.id === id);
  };

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart.id === id);
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    try {
      setIsDeleting(true);
      const res = await api.delete(`/product/${productId}`);
      console.log(res.data);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
      console.log(err.response?.data?.message || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);
  return (
    <>
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
      <main className="bg-light min-vh-100">
        <section className="container py-4 py-lg-5">
          <div className="row g-4">
            {/* LEFT SIDE - IMAGE SECTION */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="position-md-sticky" style={{ top: "20px" }}>
                <div
                  className="card border-0 shadow-sm overflow-hidden"
                  style={{
                    minHeight: "500px",
                    height: "calc(100vh - 100px)",
                    maxHeight: "700px",
                  }}
                >
                  <div className="card-body bg-white  d-flex flex-column h-100">
                    <ProductImageCarousel images={productInfo.images} />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - PRODUCT DETAILS */}
            <div className="col-12 col-md-6 col-lg-7">
              <div className="bg-white rounded shadow-sm p-3 p-md-4 p-lg-3 h-100">
                <h1 className="display-6 display-lg-5 fw-bold text-dark mb-3">
                  {productInfo.name}
                </h1>

                <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`bi bi-star${
                          index < Math.floor(productInfo.rating) ? "-fill" : ""
                        } text-warning`}
                        style={{ fontSize: "1.1rem" }}
                      ></i>
                    ))}
                  </div>
                  <span className="fw-semibold text-dark">
                    {productInfo.rating}
                  </span>
                  <span className="text-muted small">
                    ({productInfo.reviews || 0} reviews)
                  </span>
                </div>

                <div className="d-flex align-items-center flex-wrap gap-3 mb-2 pb-2 border-bottom">
                  <h2 className="text-success fw-bold mb-0 fs-2">
                    ₹{productInfo.discountPrice}
                  </h2>
                  <span className="text-muted fs-5 text-decoration-line-through">
                    ₹{productInfo.price}
                  </span>
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                    {Math.round(
                      ((productInfo.price - productInfo.discountPrice) /
                        productInfo.price) *
                        100,
                    )}
                    % OFF
                  </span>
                </div>

                <div className="mb-2">
                  <p className="text-secondary fs-6 mb-2 lh-base">
                    {productInfo.shortDescription}
                  </p>
                  <div className="alert alert-light border d-flex align-items-center mb-0 py-2">
                    <i className="bi bi-box-seam me-2"></i>
                    <span className="small">
                      <strong>Material:</strong> {productInfo.materialType}
                    </span>
                  </div>
                </div>

                <div className="card border mb-3">
                  <div className="card-body p-3">
                    <label className="form-label fw-bold mb-3 small text-uppercase">
                      Select Quantity
                    </label>

                    <div className="d-flex gap-2 mb-3">
                      {/* Quantity */}
                      <div
                        className="input-group flex-grow-1"
                        style={{ maxWidth: "180px" }}
                      >
                        <button
                          disabled={quantity === 1}
                          onClick={() => setQuantity((prev) => prev - 1)}
                          className="btn btn-outline-dark"
                          type="button"
                        >
                          <i className="bi bi-dash"></i>
                        </button>

                        <input
                          type="text"
                          className="form-control text-center fw-bold"
                          value={quantity}
                          readOnly
                        />

                        <button
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className="btn btn-outline-dark"
                          type="button"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>

                      {/* Wishlist */}
                      {checkProductIsWishlist(productInfo.id) ? (
                        <button
                          onClick={() =>
                            handleRemoveToWishList(productInfo, navigate)
                          }
                          className="btn btn-dark"
                          style={{ width: "56px" }}
                        >
                          ❤️
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddToWishList(productInfo, navigate)
                          }
                          className="btn btn-dark"
                          style={{ width: "56px" }}
                        >
                          <i className="bi bi-heart"></i>
                        </button>
                      )}
                    </div>

                    {/* Add To Cart */}
                    {checkProductIsInCart(productInfo.id) ? (
                      <Link
                        to="/cart"
                        className="btn btn-dark w-100 py-3 fw-semibold"
                      >
                        <i className="bi bi-cart-check me-2"></i>
                        Go To Cart
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          handleAddToCart(productInfo, quantity, navigate)
                        }
                        className="btn btn-dark w-100 py-3 fw-semibold"
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Add To Cart
                      </button>
                    )}

                    {user.userId === productInfo?.createdBy && (
                      <button
                        onClick={handleDeleteProduct}
                        disabled={isDeleting}
                        className="btn btn-danger w-100 my-3 py-2"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                        {isDeleting && (
                          <span className="spinner-border spinner-border-sm ms-2" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="row g-2 g-md-3 mb-4">
                  <div className="col-4">
                    <div className="card border-0 bg-light text-center h-100 py-2 py-md-3">
                      <div className="card-body p-2">
                        <img
                          src={COD}
                          className="img-fluid mb-2"
                          style={{ width: "40px", height: "40px" }}
                          alt="COD"
                        />
                        <p
                          className="small text-muted mb-0 fw-semibold"
                          style={{ fontSize: "0.75rem", lineHeight: "1.3" }}
                        >
                          Cash on
                          <br />
                          Delivery
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="card border-0 bg-light text-center h-100 py-2 py-md-3">
                      <div className="card-body p-2">
                        <img
                          src={free}
                          className="img-fluid mb-2"
                          style={{ width: "40px", height: "40px" }}
                          alt="Free Delivery"
                        />
                        <p
                          className="small text-muted mb-0 fw-semibold"
                          style={{ fontSize: "0.75rem", lineHeight: "1.3" }}
                        >
                          Free
                          <br />
                          Delivery
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="card border-0 bg-light text-center h-100 py-2 py-md-3">
                      <div className="card-body p-2">
                        <img
                          src={payment}
                          className="img-fluid mb-2"
                          style={{ width: "40px", height: "40px" }}
                          alt="Secure Payment"
                        />
                        <p
                          className="small text-muted mb-0 fw-semibold"
                          style={{ fontSize: "0.75rem", lineHeight: "1.3" }}
                        >
                          Secure
                          <br />
                          Payment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 bg-light">
                  <div className="card-body p-3 p-md-4">
                    <div>
                      <strong className="d-block mb-2 text-dark small">
                        Description:
                      </strong>
                      <p className="text-secondary mb-0 lh-base small">
                        {productInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-4 py-lg-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
              <h2 className="h4 h-lg-3 fw-bold mb-0">Similar Products</h2>
              <span className="text-muted small">
                {similarProducts?.length || 0} items
              </span>
            </div>

            {/* MOBILE: Horizontal scroll */}
            <div className="d-lg-none">
              <div
                className="row flex-nowrap overflow-auto pb-3 gx-3"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {similarProducts && similarProducts.length !== 0 ? (
                  similarProducts.map((product) => (
                    <div key={product.id} className="col-9 col-sm-6">
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-light text-center py-4 border">
                      <i className="bi bi-inbox fs-2 text-muted d-block mb-3"></i>
                      <h6 className="text-muted mb-0">
                        No similar products found
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP: Normal grid */}
            <div className="row g-3 g-lg-4 d-none d-lg-flex">
              {similarProducts && similarProducts.length !== 0 ? (
                similarProducts.map((product) => (
                  <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-light text-center py-5 border">
                    <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted mb-0">
                      No similar products found
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductItem;
