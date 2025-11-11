import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Assets and icons
// import { FcGoogle } from "react-icons/fc";

// Features
import { loginWithPassword, resetAuthStatus } from "../store/authSlice";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedIn, status, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (status === "failed") {
      if (error && error !== "auth/popup-closed-by-user") {
        toast.error(error);
      }

      dispatch(resetAuthStatus());
    }

    if (status === "succeeded" && isLoggedIn) {
      toast.success("Login berhasil!");
      navigate(from, { replace: true });

      dispatch(resetAuthStatus());
    }

    if (isLoggedIn && status === "idle") {
      navigate(from, { replace: true });
    }
  }, [status, isLoggedIn, error, navigate, from, dispatch]);

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (status !== "loading") {
      dispatch(loginWithPassword(password));
    }
  };

  // const handleGoogleLogin = () => {
  //   if (status !== "loading") {
  //     dispatch(loginWithGoogle());
  //   }
  // };

  const isLoading = status === "loading";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-sm m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Login Ke Guru Digi AI</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Asisten Guru Berbasis AI yang membantu kamu!
        </p>

        <form onSubmit={handlePasswordLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan password..."
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Memeriksa..." : "Login"}
          </button>
        </form>

        {/* <div className="my-6 flex items-center justify-center">
          <div className="border-t border-gray-300 grow"></div>
          <span className="mx-4 text-gray-500 text-xs uppercase font-semibold">ATAU</span>
          <div className="border-t border-gray-300 grow"></div>
        </div> */}

        {/* <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle className="mr-2 text-xl" />
          {isLoading ? "Memeriksa..." : "Login dengan Google"}
        </button> */}
      </div>
    </div>
  );
};

export default Login;
