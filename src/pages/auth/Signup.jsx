import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
        formData,
      );

      console.log(response.data);
      setFormData(initialState);

      toast.success(response.data.message || "User created successfully", {
        id: toastId,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Create Account</h2>

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  disabled={isLoading}
                  className="btn btn-success w-100"
                  type="submit"
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm ms-2" />
                  )}
                </button>

                <div className="text-center mt-3">
                  <span className="text-muted">Already have an account? </span>

                  <Link
                    to="/login"
                    className="text-decoration-none fw-semibold"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
