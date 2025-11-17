import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // Check authentication status

  console.log("Token:", token); // Debugging: view saved token in console

  // If token exists → allow access; otherwise redirect to login
  return token ? children : <Navigate to="/login" replace />;
}
