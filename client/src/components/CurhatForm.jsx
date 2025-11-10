import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCurhat } from "../store/generatorSlice"; // <-- Aksi baru
import toast from "react-hot-toast";
import { FiZap } from "react-icons/fi";

// Terima props yang sama persis dengan form lainnya
const CurhatForm = ({ isFormDirty, setIsFormDirty, setIsFormVisible }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.generator);
  const isLoading = status === "loading";

  // State diganti untuk field Curhat
  const [formData, setFormData] = useState({
    permasalahan: "",
    instruksi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!isFormDirty) setIsFormDirty(true);
  };

  // Handler Submit diubah untuk Curhat
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.permasalahan) {
      toast.error("Silakan ceritakan permasalahan Anda terlebih dahulu.");
      return;
    }

    toast.success("Permintaan Anda sedang diproses...");
    dispatch(generateCurhat(formData)); // <-- Dispatch aksi baru

    setIsFormDirty(false);
    if (window.innerWidth < 1024) {
      setIsFormVisible(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      {/* Keterangan */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
        Ceritakan permasalahan, tantangan, atau kebingungan Anda. Saya akan membantu memberikan
        solusi konkret, dukungan, dan <strong>untaian motivasi puitis</strong>.
      </div>

      {/* Baris 1: Permasalahan Anda */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Permasalahan Anda</label>
        <textarea
          name="permasalahan"
          rows="8"
          value={formData.permasalahan}
          onChange={handleChange}
          placeholder="Saya merasa kesulitan mengelola siswa yang..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Baris 2: Instruksi Khusus (Opsional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instruksi Khusus (Opsional)
        </label>
        <textarea
          name="instruksi"
          rows="2"
          value={formData.instruksi}
          onChange={handleChange}
          placeholder="Contoh: Tolong fokus pada solusi jangka pendek..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        <FiZap className="mr-2" />
        {isLoading ? "Sedang Memproses..." : "Kirim Curhatan"}
      </button>
    </form>
  );
};

export default CurhatForm;
