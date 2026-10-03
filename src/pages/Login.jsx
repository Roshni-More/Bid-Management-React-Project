import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../api/authApi";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE LOGIN
  // =====================================================

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

      localStorage.setItem("accessToken", data.token);

      navigate("/dashboard", {
        replace: true,
      });
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
  <div className="login-page">

    {/* Background */}
    <video
      className="login-background"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/login-background.mp4" type="video/mp4" />
    </video>

    <div className="login-overlay" />

    <div className="login-container">

      {/* LEFT BRANDING */}
      <div className="login-branding">

        <img
          src="/logo.png"
          alt="Sdaemon Infotech"
          className="brand-logo"
        />

        <p className="company-name">
          Sdaemon Infotech Pvt. Ltd.
        </p>

        <h1 className="portal-title">
          E-Tender Portal
        </h1>

        <p className="portal-subtitle">
          GeM Bids Management
        </p>

      </div>


      {/* LOGIN FORM */}
      <div className="login-card">

        <div className="login-logo-wrapper">
          <img
            src="/logo.png"
            alt="Sdaemon"
            className="login-logo"
          />
        </div>

        <div className="login-heading">
          <h2>Welcome Back</h2>

          <p>
            Login to your GeM BIDS account
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="form-group">

            <label>Email</label>

            <div className="input-wrapper">

              <Mail className="input-icon" size={19} />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>

          </div>


          {/* PASSWORD */}
          <div className="form-group">

            <label>Password</label>

            <div className="input-wrapper">

              <Lock className="input-icon" size={19} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                className="password-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>


          {/* ERROR */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                Login
                <ArrowRight size={19} />
              </>
            )}
          </button>

        </form>

        <div className="login-footer">
         
        </div>

      </div>

    </div>

  </div>
);
};

export default Login;