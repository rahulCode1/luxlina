import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import Loading from "../components/Loading";
import api from "../utils/axios";

const AllOrders = () => {
  const revalidator = useRevalidator().revalidate;
  const { handleCancelOrder, isLoadingOrders } = useEcommerce();
  const userOrders = useLoaderData()?.orders;

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "warning",
      completed: "success",
      failed: "danger",
      refunded: "info",
      confirmed: "primary",
      shipped: "info",
      delivered: "success",
      cancelled: "danger",
    };
    return statusColors[status] || "secondary";
  };

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4 fw-bold text-primary">All Orders</h1>
          <p className="text-muted">Track and manage your orders</p>
        </div>
      </div>

      {isLoadingOrders ? (
        <Loading />
      ) : (
        <div>
          {userOrders && userOrders.length > 0 ? (
            <div className="row g-4">
              {userOrders.map((order, index) => (
                <div className="col-12" key={order._id || index}>
                  <div className="card shadow-sm border-0">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-0">Order #{index + 1}</h5>
                        <small>
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </small>
                      </div>
                      <div className="text-end">
                        <span
                          className={`badge bg-${getStatusBadge(
                            order.paymentStatus,
                          )} me-2`}
                        >
                          Payment: {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-4 mb-3">
                          <div className="border rounded p-3 h-100 bg-light">
                            <h6 className="text-primary mb-3">
                              <i className="bi bi-geo-alt-fill me-2"></i>
                              Shipping Address
                            </h6>
                            <p className="mb-2">
                              <strong>{order.address.name}</strong>
                            </p>
                            <p className="mb-1 text-muted small">
                              <i className="bi bi-telephone-fill me-2"></i>
                              {order.address.phoneNumber}
                            </p>
                            <p className="mb-1 text-muted small">
                              {order.address.fullAddress}
                            </p>
                            <p className="mb-0 text-muted small">
                              {order.address.area}, {order.address.city}
                            </p>
                            <p className="mb-0 text-muted small">
                              {order.address.state} - {order.address.zipCode}
                            </p>
                          </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                          <div className="border rounded p-3 h-100 bg-light">
                            <h6 className="text-primary mb-3">
                              <i className="bi bi-receipt me-2"></i>
                              Order Summary
                            </h6>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted">Total Items:</span>
                              <strong>{order?.summary?.totalQuantity}</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted">Subtotal:</span>
                              <span>
                                ₹
                                {(
                                  order?.summary?.totalPrice +
                                  order?.summary?.totalDiscount
                                ).toFixed(2)}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 text-success">
                              <span>Discount:</span>
                              <span>
                                -₹{order?.summary?.totalDiscount.toFixed(2)}
                              </span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                              <strong className="text-dark">Total:</strong>
                              <strong className="text-primary fs-5">
                                ₹{order?.summary?.totalPrice.toFixed(2)}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                          <div className="border rounded p-3 h-100 bg-light">
                            <h6 className="text-primary mb-3">
                              <i className="bi bi-gear-fill me-2"></i>
                              Quick Actions
                            </h6>
                            <div className="d-grid gap-2">
                              {order.orderStatus !== "cancelled" &&
                                order.orderStatus !== "delivered" && (
                                  <button
                                    onClick={() =>
                                      handleCancelOrder(order.id, revalidator)
                                    }
                                    className="btn btn-outline-danger btn-sm"
                                  >
                                    <i className="bi bi-x-circle me-2"></i>
                                    Cancel Order
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h6 className="text-primary mb-3">
                          <i className="bi bi-box-seam me-2"></i>
                          Order Items ({order.products.length})
                        </h6>
                        <div className="table-responsive">
                          <table className="table table-hover align-middle">
                            <thead className="table-light">
                              <tr>
                                <th>Product</th>
                                <th>Specifications</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-end">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product, pIndex) => (
                                <tr key={pIndex}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <img
                                        src={product?.productId?.images[0].url}
                                        alt={product.name}
                                        className="rounded me-3"
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <div>
                                        <h6 className="mb-0">{product.name}</h6>
                                        <small className="text-muted">
                                          Material:{" "}
                                          {product?.productId?.materialType}
                                        </small>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <small className="text-muted">
                                      <div>
                                        Height: {product?.productId?.height} cm
                                      </div>
                                    </small>
                                  </td>
                                  <td className="text-center">
                                    <span className="badge bg-secondary">
                                      Qty: {product?.quantity}
                                    </span>
                                  </td>

                                  <td className="text-end">
                                    <strong className="text-primary">
                                      ₹
                                      {product?.productId?.discountPrice.toFixed(
                                        2,
                                      )}
                                    </strong>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              <div className="col">
                <div className="card shadow-sm border-0 text-center py-5">
                  <div className="card-body">
                    <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
                    <h3 className="text-muted">No Orders Found</h3>
                    <p className="text-muted">
                      You haven't placed any orders yet.
                    </p>
                    <Link to="/products" className="btn btn-primary mt-3">
                      <i className="bi bi-shop me-2"></i>
                      Start Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllOrders;

export const loader = async () => {
  try {
    const res = await api.get("/order");

    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.response?.data?.message);
  }
};
