import { Link, useNavigate } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
import api from "../utils/axios";
import { useState } from "react";
import ErrorModal from "../components/ErrorModal";

const Checkout = () => {
  const [payment, setPayment] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const {
    error,
    setError,
    productCart,
    setProductCart,
    address,
    handleSelectDefaultAddress,
  } = useEcommerce();
  const navigate = useNavigate();

  const totalPrice = productCart.reduce(
    (acc, curr) => acc + Number(curr.discountPrice) * curr.quantity,
    0,
  );

  const totalQuantity = productCart.reduce(
    (acc, curr) => acc + curr.quantity,
    0,
  );

  const totalDiscount = productCart.reduce(
    (acc, curr) => acc + (Number(curr.price) - Number(curr.discountPrice)),
    0,
  );

  const selectedAddress =
    address &&
    address.length > 0 &&
    address.find((address) => address.isDefault === true);

  const handleSubmitOrder = async () => {
    if (address.length === 0) {
      return setError("Please add address.");
    }

    if (address.length !== 0 && !selectedAddress) {
      return setError("Please select an address.");
    }

    const toastId = toast.loading("Place order...");

    const userProducts = [];

    for (let product of productCart) {
      userProducts.push({
        productId: product.id,
        quantity: product.quantity,
      });
    }

    const order = {
      products: userProducts,
      address: selectedAddress.id,
      summary: {
        totalPrice,
        totalDiscount,
        totalQuantity,
      },
      paymentMethod: payment,
      paymentStatus: payment === "online" ? "completed" : "pending",
      orderPlacedBy: "69384436ebe3d68324ec1040",
    };

    setIsLoading(true);
    try {
      const response = await api.post(`/order`, order);

      setProductCart([]);
      navigate("/orders");
      // console.log(response.data);
      toast.success(response.data?.message || "Order place successfully.", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Error occurred while place order.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container py-4">
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      {isLoading && (
        <div className="overlay">
          <Loading />
        </div>
      )}

      {address && address.length > 0 && (
        <h3 className="mb-4 fw-bold">Select Delivery Address</h3>
      )}

      <div className="row g-4">
        <div className="col-md-6">
          {address && address.length > 0 ? (
            address.map((userAdd) => (
              <div
                key={userAdd.id}
                className={`card mb-3 shadow-sm ${
                  userAdd.isDefault ? "border border-primary" : ""
                }`}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{userAdd.name}</h5>

                    {userAdd.isDefault && (
                      <span className="badge text-bg-primary">Default</span>
                    )}
                  </div>

                  <p className="mb-1 text-muted">
                    <strong>📞</strong> {userAdd.phoneNumber}
                  </p>

                  <p className="mb-1">
                    <strong>Zip:</strong> {userAdd.zipCode}
                  </p>
                  <p className="mb-1">
                    <strong>City:</strong> {userAdd.city}
                  </p>
                  <p className="mb-1">
                    <strong>State:</strong> {userAdd.state}
                  </p>
                  <p className="mb-3">
                    <strong>Address:</strong> {userAdd.fullAddress}
                  </p>

                  {!userAdd.isDefault && (
                    <button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={() => handleSelectDefaultAddress(userAdd)}
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning">
              <p className="mb-2">No Address Found.</p>
              <Link
                to="/addAddress"
                state={{ from: "/checkout" }}
                className="btn btn-primary btn-sm"
              >
                Add New Address
              </Link>
            </div>
          )}

          {productCart && productCart.length > 0 && (
            <div className="text-center mt-3">
              <Link
                to="/addAddress"
                state={{ from: "/checkout" }}
                className="btn btn-outline-dark btn-sm"
              >
                + Add New Address
              </Link>
            </div>
          )}
        </div>

        <div className="col-md-6">
          {productCart && productCart.length > 0 ? (
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Review Your Order</h5>

                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    Total Quantity: <strong>{totalQuantity}</strong>
                  </li>
                  <li className="list-group-item">
                    Total Price: <strong>{totalPrice}</strong>
                  </li>
                  <li className="list-group-item">
                    Total Discount: <strong>{totalDiscount}</strong>
                  </li>
                  <li className="list-group-item">
                    Delivery Time: <strong>2 days</strong>
                  </li>
                </ul>

                <label htmlFor="payment" className="form-label fw-semibold">
                  Select Payment Method
                </label>

                <select
                  onChange={(e) => setPayment(e.target.value)}
                  required
                  id="payment"
                  className="form-select mb-3"
                >
                  <option value="cod" selected>
                    Cash On Delivery
                  </option>
                  <option value="online">Pay Online</option>
                </select>

                <button
                  onClick={handleSubmitOrder}
                  disabled={isLoading}
                  className="btn btn-success w-100 py-2 fw-bold"
                >
                  Place Order
                </button>
              </div>
            </div>
          ) : (
            <p className="alert alert-info">
              No Product in Cart. <Link to="/cart">Go to Cart</Link>.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Checkout;
