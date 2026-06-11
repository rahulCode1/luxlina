import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEcommerce } from "../../context/EcommerceContext";
import ErrorModal from "../../components/ErrorModal";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin, error, setError, setUser } = useEcommerce();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loging in...");
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        formData,
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data?.name,
          email: response.data?.email,
          userId: response.data?.userId,
        }),
      );
      setUser({
        name: response.data?.name,
        email: response.data?.email,
        userId: response.data?.userId,
      });
      setIsLogin(true);
      toast.success(response.data.message || "User login successfully", {
        id: toastId,
      });
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
      toast.error(error.response?.data?.message || "Login failed.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-md-6 col-lg-4">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleLogin}>
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
                    className="btn btn-primary w-100"
                    type="submit"
                  >
                    {isLoading ? "Loging in..." : "Login"}
                    {isLoading && (
                      <span className="spinner-border spinner-border-sm ms-2" />
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account? </span>

                    <Link
                      to="/signup"
                      className="text-decoration-none fw-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
