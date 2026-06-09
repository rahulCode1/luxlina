import { Link, useNavigate } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
export default function ProductCard({ product }) {
  const {
    productCart,
    wishlist,
    handleAddToWishList,
    handleAddToCart,
    handleRemoveToWishList,
  } = useEcommerce();
  const navigate = useNavigate();
  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product.id === id);
  };

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart.id === id);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative">
      {/* Wishlist Button */}
      <button
        onClick={() =>
          checkProductIsWishlist(product.id)
            ? handleRemoveToWishList(product, navigate)
            : handleAddToWishList(product, navigate)
        }
        className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
        style={{
          width: "40px",
          height: "40px",
          fontSize: "20px",
          zIndex: 10,
          padding: 0,
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.backgroundColor = "#f8f9fa";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "";
        }}
      >
        {checkProductIsWishlist(product.id) ? "❤️" : "🤍"}
      </button>

      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none text-dark d-block"
        style={{ overflow: "hidden" }}
      >
        <img
          src={product.images[0].url}
          alt={product.name}
          className="card-img-top"
          style={{
            height: "260px",
            width: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Link>

      {/* Body */}
      <div className="card-body d-flex flex-column p-3 p-md-4">
        {/* Product Name - Fixed height with proper line clamping */}
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-dark"
        >
          <h5
            className="card-title fw-semibold mb-2"
            style={{
              fontSize: "1rem",
              lineHeight: "1.4",
              height: "2.8em", // Exactly 2 lines
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.name}
          </h5>
        </Link>

        {/* Rating with Stars */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <div className="d-flex align-items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                style={{
                  fontSize: "16px",
                  color:
                    index < Math.floor(product.rating) ? "#ffc107" : "#e4e5e9",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <span
            className="fw-medium"
            style={{
              fontSize: "0.875rem",
              color: "#666",
              lineHeight: 1,
            }}
          >
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <p
          className="mb-3"
          style={{
            fontSize: "1.25rem",
            color: "#212529",
            fontWeight: "600",
            lineHeight: 1,
          }}
        >
          ₹{product.discountPrice.toLocaleString()}
        </p>

        {/* Action Button */}
        <div className="mt-auto">
          {checkProductIsInCart(product.id) ? (
            <Link
              to="/cart"
              className="btn btn-outline-dark w-100 py-2 rounded-pill fw-medium"
              style={{
                letterSpacing: "0.3px",
                transition: "all 0.2s ease",
              }}
            >
              View in Cart
            </Link>
          ) : (
            <button
              onClick={() => handleAddToCart(product, 1, navigate)}
              className="btn btn-dark w-100 py-2 rounded-pill fw-medium"
              style={{
                letterSpacing: "0.3px",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
