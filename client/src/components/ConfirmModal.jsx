import { FiX, FiAlertTriangle } from "react-icons/fi";

// Modal ini menggunakan 'Fragments' dan 'Portals' (via div 'modal-root' jika ada)
// Tapi untuk kesederhanaan, kita gunakan 'fixed' position
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 1. Latar Belakang Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black opacity-80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 2. Konten Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header Modal */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiAlertTriangle className="mr-2 text-yellow-500" />
              {title}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Body Modal */}
          <div className="p-6 text-gray-600">{children}</div>

          {/* Footer (Tombol Aksi) */}
          <div className="flex justify-end space-x-3 bg-gray-50 p-4 rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Ya, Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
