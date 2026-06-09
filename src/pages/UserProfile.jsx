import { Link } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
import api from "../utils/axios";

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    user,
    address,
    handleSelectDefaultAddress,
    isLoadingAddress,
    handleRemoveAddress,
  } = useEcommerce();

  const removeAddress = async (id) => {
    const toastId = toast.loading("Address remove...");
    setIsLoading(true);
    try {
      const response = await api.delete(`/address/${id}`);

      console.log(response.data);
      toast.success(
        response?.data?.message || "Address removed successfully.",
        { id: toastId },
      );
      setIsLoading(false);
      handleRemoveAddress(id);
    } catch (error) {
      toast.error("Failed to remove address.", { id: toastId });
    }
  };

  return (
    <>
      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="container">
          <div className="row g-4">
            {/* Profile Card */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm overflow-hidden h-100">
                {/* Profile Header with Gradient */}
                <div
                  className="text-white text-center p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <div className="position-relative d-inline-block mb-3">
                    <div
                      className="rounded-full bg-white border-4 border-blue-500 text-blue-500 d-flex justify-center items-center text-5xl  font-bold"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    >
                      {user?.name[0]}
                    </div>
                  </div>
                  <h4 className="mb-1 fw-bold">{user?.name}</h4>
                </div>

                {/* Contact Information */}
                <div className="card-body p-4">
                  <h6 className="text-uppercase text-muted small fw-bold mb-3">
                    Contact Information
                  </h6>

                  <div className="mb-3">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#e8eaf6",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="#5e35b1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                        </svg>
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-muted d-block">Email</small>
                        <span className="fw-medium">{user?.email}</span>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Action Buttons */}
                  <div className="d-grid gap-2">
                    <Link
                      to="/addAddress"
                      state={{ from: "/user" }}
                      className="btn btn-lg text-white fw-medium"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      Add New Address
                    </Link>
                    <Link
                      to="/orders"
                      className="btn btn-lg btn-outline-primary fw-medium"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                      </svg>
                      View All Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses Section */}
            {isLoadingAddress ? (
              <Loading />
            ) : (
              <div className="col-lg-8">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="mb-1 fw-bold">Delivery Addresses</h3>
                      <p className="text-muted mb-0">
                        Manage your shipping addresses
                      </p>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
                      style={{
                        width: "48px",
                        height: "48px",
                        fontSize: "1.25rem",
                      }}
                    >
                      {address?.length || 0}
                    </div>
                  </div>
                </div>

                {address && address.length > 0 ? (
                  <div className="row row-cols-1 row-cols-xl-2 g-4">
                    {address.map((userAdd) => (
                      <div className="col" key={userAdd.id}>
                        <div className="card border-0 shadow-sm h-100 position-relative overflow-hidden">
                          {/* Default Badge Ribbon */}
                          {userAdd.isDefault && (
                            <div
                              className="position-absolute top-0 end-0 bg-success text-white px-3 py-1 fw-medium small"
                              style={{
                                transform:
                                  "translateX(30%) translateY(0%) rotate(45deg)",
                                transformOrigin: "top left",
                                width: "140px",
                                textAlign: "center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              }}
                            >
                              ✓ DEFAULT
                            </div>
                          )}

                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 className="card-title mb-1 fw-bold">
                                  {userAdd.name}
                                </h5>
                                <span className="badge bg-light text-dark border">
                                  Shipping Address
                                </span>
                              </div>
                              {!userAdd.isDefault && (
                                <button
                                  onClick={() =>
                                    handleSelectDefaultAddress(userAdd)
                                  }
                                  className="btn btn-sm btn-outline-success"
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  Set Default
                                </button>
                              )}
                            </div>

                            <div className="mb-3 pb-3 border-bottom">
                              <div className="d-flex align-items-center text-muted">
                                <svg
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="me-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                                <span>{userAdd.phoneNumber}</span>
                              </div>
                            </div>

                            <div className="row g-3 mb-3">
                              <div className="col-4">
                                <div className="p-2 bg-light rounded text-center">
                                  <small className="text-muted d-block mb-1">
                                    Zip Code
                                  </small>
                                  <span className="fw-bold d-block">
                                    {userAdd.zipCode}
                                  </span>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="p-2 bg-light rounded text-center">
                                  <small className="text-muted d-block mb-1">
                                    City
                                  </small>
                                  <span className="fw-bold d-block">
                                    {userAdd.city}
                                  </span>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="p-2 bg-light rounded text-center">
                                  <small className="text-muted d-block mb-1">
                                    State
                                  </small>
                                  <span className="fw-bold d-block">
                                    {userAdd.state}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div
                                className="p-3 rounded"
                                style={{
                                  backgroundColor: "#f8f9fa",
                                  border: "2px dashed #dee2e6",
                                }}
                              >
                                <div className="d-flex align-items-start">
                                  <svg
                                    width="20"
                                    height="20"
                                    fill="#6c757d"
                                    className="me-2 mt-1 flex-shrink-0"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                  </svg>
                                  <p className="mb-0 small">
                                    {userAdd.fullAddress}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="row g-2">
                              <div className="col-6">
                                <Link
                                  to={`/address/${userAdd.id}`}
                                  state={{ from: "/user" }}
                                  className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    fill="currentColor"
                                    className="me-2"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                  </svg>
                                  Edit
                                </Link>
                              </div>
                              <div className="col-6">
                                <button
                                  onClick={() => removeAddress(userAdd.id)}
                                  disabled={isLoading}
                                  className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                                >
                                  {isLoading ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm me-2"></span>
                                      Deleting...
                                    </>
                                  ) : (
                                    <>
                                      <svg
                                        width="14"
                                        height="14"
                                        fill="currentColor"
                                        className="me-2"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
                                      </svg>
                                      Delete
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{
                          width: "100px",
                          height: "100px",
                          backgroundColor: "#f8f9fa",
                        }}
                      >
                        <svg
                          width="48"
                          height="48"
                          fill="#6c757d"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                      </div>
                      <h5 className="mb-2">No Addresses Yet</h5>
                      <p className="text-muted mb-4">
                        Add your first delivery address to start shopping
                      </p>
                      <Link
                        to={"/addAddress"}
                        className="btn btn-primary btn-lg"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="me-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Add Your First Address
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
