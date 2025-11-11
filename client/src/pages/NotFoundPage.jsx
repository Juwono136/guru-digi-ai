import { Link } from "react-router-dom";

// Assets and icons
import { FiFrown } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <FiFrown className="h-24 w-24 text-blue-500 mb-6" />
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mt-4 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>

      <Link
        to="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
};

export default NotFoundPage;
