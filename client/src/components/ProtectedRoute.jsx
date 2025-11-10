import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Ambil state 'isLoggedIn' dari slice 'auth'
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect ke halaman login, simpan lokasi asal
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika sudah login, tampilkan "children" (misal: Dashboard)
  return children;
};

export default ProtectedRoute;
