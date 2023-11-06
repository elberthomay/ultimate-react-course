import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated)
      setTimeout(() => {
        navigate("/login");
      }, 1000);
  }, [isAuthenticated]);
  return isAuthenticated ? children : <p> You are not authenticated</p>;
}

export default ProtectedRoute;
