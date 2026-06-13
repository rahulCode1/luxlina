import { Link } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import Loading from "../components/Loading";

const Wishlist = () => {
  const {
    wishlist,
    isLoadingWishlist,
    handleWishListToCart,
    handleRemoveToWishList,
  } = useEcommerce();

  return (
    <main className="container py-4">
      <h1 className="mb-4">My Wishlist</h1>

      {isLoadingWishlist ? (
        <Loading />
      ) : (
        <div className="row g-4">
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((product) => (
              <div className="col-md-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <Link to={`/products/${product?.id}`}>
                    <img
                      src={product.images[0].url}
                      className="card-img-top object-fit-cover"
                      style={{ height: "250px" }}
                      alt={product.name}
                    />
                  </Link>
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="mb-3">Price: ₹{product.price}</p>

                    <div className="mt-auto">
                      <button
                        onClick={() => handleWishListToCart(product)}
                        className="btn btn-primary w-100 mb-2"
                      >
                        Move to Cart
                      </button>

                      <button
                        onClick={() => handleRemoveToWishList(product)}
                        className="btn btn-outline-danger w-100"
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products on wishlist.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default Wishlist;
