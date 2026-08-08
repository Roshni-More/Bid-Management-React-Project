import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {

      setLoading(true);

      const data = await loginUser(formData);

      console.log("Login Response:", data);

      // Save JWT
      localStorage.setItem(
        "accessToken",
        data.token
      );

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >

      <div
        className="card shadow border-0"
        style={{
          width: "400px",
          borderRadius: "12px",
        }}
      >

        <div className="card-body p-4">

          {/* Logo */}
          <div className="text-center mb-4">

            <h3 className="fw-bold mb-1">
              GeM
            </h3>

            <p className="text-muted small mb-3">
              BID MANAGEMENT SYSTEM
            </p>

            <h5 className="fw-semibold">
              Login
            </h5>

          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-3">

              <label className="form-label fw-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* Password */}
            <div className="mb-4">

              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

            {/* Login */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;