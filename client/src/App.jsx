import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Routes>
        {/* Rute Publik: Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Rute Terlindungi: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Rute Root (mengarahkan ke dashboard jika login) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Rute Terlindungi lainnya bisa ditambahkan di sini */}
        {/* <Route
          path="/generator-rpp"
          element={
            <ProtectedRoute>
              <RppGenerator />
            </ProtectedRoute>
          }
        /> */}

        {/* Redirect jika tidak ada rute yang cocok
          Ini bisa disesuaikan, mungkin redirect ke "/" atau halaman 404
      */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
