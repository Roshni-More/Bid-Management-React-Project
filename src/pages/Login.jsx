import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
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
  <div className="relative min-h-screen w-full overflow-hidden items-center justify-end px-25 py-8">
    {/* <div className="relative z-10 flex min-h-screen items-center justify-end px-25 py-8"> */}

    {/* ================= VIDEO BACKGROUND ================= */}
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/login-background.mp4" type="video/mp4" />
    </video>

    {/* Background overlay */}
    <div className="absolute inset-0 bg-black/20" />
{/* ================= LEFT SIDE BRANDING ================= */}
<div className="absolute left-0 top-1/2 z-20 flex w-1/2 -translate-y-1/2 justify-center">
  
  <div className="text-center text-white">

    {/* Logo */}
    <div className="mb-4 flex justify-center">
      <img
        src="/logo.png"
        alt="Sdaemon Infotech"
        className="h-40 w-auto object-contain"
      />
    </div>

    {/* Company Name */}
    <p className="text-sm font-semibold tracking-wide text-white/90">
      Sdaemon Infotech Pvt. Ltd.
    </p>

    {/* Portal Name */}
    <h1 className="text-3xl font-semibold leading-tight tracking-tight">
      E-Tender Portal
    </h1>

    {/* GeM Bids */}
    <p className="mt-1 text-xl font-bold text-yellow-400">
      GeM Bids Management
    </p>

  </div>

</div>


    {/* ================= RIGHT LOGIN ================= */}
    <div
      className="
        relative
        z-20
        flex
        min-h-screen
        items-center
        justify-center
        px-5

        lg:justify-end
        lg:pr-10

        xl:pr-16
      "
    >

      {/* ================= GLASS CARD ================= */}
      <div
  className="
    w-full
    max-w-md
    rounded-3xl
    border
    border-white/40
    bg-white/20
    px-8
    py-7
    shadow-2xl
    backdrop-blur-2xl
    backdrop-saturate-150
    animate-login-slide
  "
>

        {/* ================= LOGO ================= */}
        <div className="mb-4 flex justify-center">

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center

              rounded-full

              border
              border-white/50

              bg-white/25

              p-3

              shadow-lg
            "
          >
            <img
              src="/logo.png"
              alt="Sdaemon"
              className="h-full w-full object-contain"
            />
          </div>

        </div>


        {/* ================= TITLE ================= */}
        <div className="mb-6 text-center">

          <h2 className="text-3xl font-bold tracking-wide text-white">
            Welcome Back
          </h2>

          <p className="mt-1.5 text-sm text-white/80">
            Login to your GeM BIDS account
          </p>

        </div>


        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="mb-4">

            <label className="mb-1.5 block text-sm font-semibold text-white">
              Email
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-white/75
                "
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl

                  border
                  border-white/40

                  bg-white/20

                  py-3
                  pl-11
                  pr-4

                  text-sm
                  text-white

                  placeholder-white/60

                  outline-none

                  backdrop-blur-md

                  transition-all

                  focus:border-white
                  focus:bg-white/30
                  focus:ring-2
                  focus:ring-white/20
                "
              />

            </div>

          </div>


          {/* PASSWORD */}
          <div className="mb-5">

            <label className="mb-1.5 block text-sm font-semibold text-white">
              Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-white/75
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl

                  border
                  border-white/40

                  bg-white/20

                  py-3
                  pl-11
                  pr-12

                  text-sm
                  text-white

                  placeholder-white/60

                  outline-none

                  backdrop-blur-md

                  transition-all

                  focus:border-white
                  focus:bg-white/30
                  focus:ring-2
                  focus:ring-white/20
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-white/75
                  hover:text-white
                "
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>


          {/* ERROR */}
          {error && (
            <div
              className="
                mb-4
                rounded-lg
                border
                border-red-300/30
                bg-red-500/20
                px-3
                py-2
                text-sm
                text-red-100
              "
            >
              {error}
            </div>
          )}


          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              group
              relative
              flex
              w-full
              items-center
              justify-center
              gap-2

              overflow-hidden
              rounded-xl

              bg-gradient-to-r
              from-blue-500
              to-blue-700

              py-3

              text-base
              font-semibold
              text-white

              shadow-lg

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-blue-500/30

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            <span className="relative z-10">
              {loading ? "Logging in..." : "Login"}
            </span>

            {!loading && (
              <ArrowRight
                size={19}
                className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            )}

            {/* Button shine */}
            <span
              className="
                absolute
                inset-y-0
                -left-20
                w-16
                rotate-12
                bg-white/40
                blur-md

                transition-all
                duration-700

                group-hover:left-[120%]
              "
            />

          </button>

        </form>


        {/* ================= FOOTER ================= */}
        <div className="mt-5 text-center">

         
        </div>

      </div>

    </div>
</div>
  // </div>
);
};

export default Login;