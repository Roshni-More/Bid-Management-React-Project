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
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // Handle Input Change
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Handle Login
  // =========================
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

      // console.log("Login Response:", data);

      // Save JWT
      localStorage.setItem("accessToken", data.token);

      // Go to Dashboard
    navigate("/dashboard", { replace: true });
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
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",

        /* GeM Background */
        backgroundImage: "url('/gem-login-bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        /* Login Card Position */
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",

        paddingRight: "5%",
        paddingLeft: "20px",
      }}
    >

      {/* =========================================
          LOGIN CARD
      ========================================= */}
      <div
        className="shadow"
        style={{
          width: "480px",
          maxWidth: "90vw",

          background: "rgba(255, 255, 255, 0.97)",

          borderRadius: "14px",

          padding: "40px 42px",

          marginRight: "2%",

          position: "relative",
          zIndex: 2,

          boxShadow:
            "0 15px 40px rgba(0, 0, 0, 0.18)",
        }}
      >

        {/* =========================================
            HEADER
        ========================================= */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >

          {/* User Icon */}
          <div
            style={{
              width: "68px",
              height: "68px",

              borderRadius: "50%",

              background: "#f1f7fc",

              border: "1px solid #dce8f2",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              margin: "0 auto 18px",

              fontSize: "28px",
            }}
          >
            👤
          </div>

          {/* Welcome */}
          <h2
            style={{
              margin: 0,
              marginBottom: "8px",

              color: "#12375d",

              fontSize: "32px",

              fontWeight: "700",
            }}
          >
            Welcome Back
          </h2>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,

              color: "#64748b",

              fontSize: "15px",
            }}
          >
            Login to your GeM BIDS account
          </p>

        </div>


        {/* =========================================
            ERROR
        ========================================= */}
        {error && (
          <div
            className="alert alert-danger"
            style={{
              fontSize: "14px",
              padding: "10px 12px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}


        {/* =========================================
            FORM
        ========================================= */}
        <form onSubmit={handleSubmit}>

          {/* =====================================
              EMAIL
          ===================================== */}
          <div style={{ marginBottom: "20px" }}>

            <label
              style={{
                display: "block",

                marginBottom: "8px",

                color: "#172b4d",

                fontSize: "14px",

                fontWeight: "600",
              }}
            >
              Email
            </label>


            <div
              style={{
                height: "54px",

                display: "flex",

                alignItems: "center",

                border: "1px solid #cbd5e1",

                borderRadius: "8px",

                background: "#ffffff",

                padding: "0 14px",
              }}
            >

              {/* Icon */}
              <span
                style={{
                  fontSize: "17px",
                  marginRight: "10px",
                }}
              >
                👤
              </span>


              {/* Input */}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "100%",

                  border: "none",
                  outline: "none",

                  fontSize: "15px",

                  color: "#172b4d",

                  background: "transparent",
                }}
              />

            </div>

          </div>


          {/* =====================================
              PASSWORD
          ===================================== */}
          <div style={{ marginBottom: "15px" }}>

            <label
              style={{
                display: "block",

                marginBottom: "8px",

                color: "#172b4d",

                fontSize: "14px",

                fontWeight: "600",
              }}
            >
              Password
            </label>


            <div
              style={{
                height: "54px",

                display: "flex",

                alignItems: "center",

                border: "1px solid #cbd5e1",

                borderRadius: "8px",

                background: "#ffffff",

                padding: "0 14px",
              }}
            >

              {/* Lock Icon */}
              <span
                style={{
                  fontSize: "17px",
                  marginRight: "10px",
                }}
              >
                🔒
              </span>


              {/* Password Input */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "100%",

                  border: "none",
                  outline: "none",

                  fontSize: "15px",

                  color: "#172b4d",

                  background: "transparent",
                }}
              />


              {/* Show Password */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  border: "none",

                  background: "transparent",

                  cursor: "pointer",

                  fontSize: "16px",

                  padding: "0",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>


          {/* =====================================
              REMEMBER + FORGOT
          ===================================== */}
         


          {/* =====================================
              LOGIN BUTTON
          ===================================== */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",

              height: "54px",

              border: "none",

              borderRadius: "8px",

              background: "#075487",

              color: "#ffffff",

              fontSize: "17px",

              fontWeight: "600",

              cursor: loading
                ? "not-allowed"
                : "pointer",

              opacity: loading ? 0.7 : 1,

              transition: "0.2s",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        {/* =========================================
            OR DIVIDER
        ========================================= */}
       


        {/* =========================================
            GEM SECURE
        ========================================= */}
       


        {/* =========================================
            REGISTER
        ========================================= */}
        

      </div>

    </div>
  );
};

export default Login;