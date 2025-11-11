import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Assets and icons
import { FiZap, FiChevronDown } from "react-icons/fi";

// Features
import { generateMateri } from "../store/generatorSlice";

const MateriForm = ({ isFormDirty, setIsFormDirty, setIsFormVisible }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.generator);
  const isLoading = status === "loading";

  const [formData, setFormData] = useState({
    judul: "",
    teksPanjang: "",
    jenisOutput: "",
    instruksi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!isFormDirty) setIsFormDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.teksPanjang || !formData.jenisOutput) {
      toast.error("Judul, Teks Materi, dan Jenis Output wajib diisi!");
      return;
    }
    toast.success("Permintaan Teks/Ringkasan dikirim ke AI...");
    dispatch(generateMateri(formData));
    setIsFormDirty(false);
    if (window.innerWidth < 1024) {
      setIsFormVisible(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Bahan Ajar</label>
        <input
          type="text"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          placeholder="Contoh: Pengenalan Ekosistem"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teks Panjang atau Poin-poin Materi
        </label>
        <textarea
          name="teksPanjang"
          rows="8"
          value={formData.teksPanjang}
          onChange={handleChange}
          placeholder="Salin-tempel (paste) materi Anda di sini, atau ketik poin-poin utamanya..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Output</label>
        <select
          name="jenisOutput"
          value={formData.jenisOutput}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Jenis Output...</option>
          <option value="Ringkasan padat (poin-poin penting)">Ringkasan padat</option>
          <option value="Bahan ajar lengkap (narasi/paragraf)">Bahan ajar lengkap</option>
          <option value="Poin-poin penting">Poin-poin penting</option>
          <option value="Kerangka mind map">Kerangka mind map</option>
        </select>
        <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instruksi Khusus (Opsional)
        </label>
        <textarea
          name="instruksi"
          rows="2"
          value={formData.instruksi}
          onChange={handleChange}
          placeholder="Contoh: Buat ringkasan dalam 3 paragraf..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        <FiZap className="mr-2" />
        {isLoading ? "Sedang Membuat..." : "Hasilkan Teks"}
      </button>
    </form>
  );
};

export default MateriForm;
