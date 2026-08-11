import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) {
      return false;
    }

    return decodedToken.exp * 1000 > Date.now();

  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("accessToken");

  // No token OR invalid/expired token
  if (!isTokenValid(token)) {

    localStorage.removeItem("accessToken");

    return <Navigate to="/login" replace />;
  }

  // Token is valid
  return children;
};

export default ProtectedRoute;