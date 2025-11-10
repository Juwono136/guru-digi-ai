import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePresentasi } from "../store/generatorSlice"; // <-- Aksi baru
import toast from "react-hot-toast";
import { FiZap, FiChevronDown } from "react-icons/fi";

// Data untuk dropdown dinamis (sama)
const kelasData = {
  SD: ["1", "2", "3", "4", "5", "6"],
  SMP: ["7", "8", "9"],
  SMA: ["10", "11", "12"],
};

// Terima props yang sama persis dengan ModulAjarForm
const PresentasiForm = ({ isFormDirty, setIsFormDirty, setIsFormVisible }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.generator);
  const isLoading = status === "loading";

  // State diganti untuk field Presentasi
  const [formData, setFormData] = useState({
    jenjang: "",
    kelas: "",
    mapel: "",
    mapelKustom: "",
    topik: "", // <-- Field baru
    tujuan: "", // <-- Field baru
    durasi: "", // <-- Field baru
    instruksi: "",
  });
  const [kelasOptions, setKelasOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!isFormDirty) setIsFormDirty(true);
  };

  const handleJenjangChange = (e) => {
    const jenjangPilihan = e.target.value;
    setFormData((prev) => ({
      ...prev,
      jenjang: jenjangPilihan,
      kelas: "",
    }));
    setKelasOptions(kelasData[jenjangPilihan] || []);
    if (!isFormDirty) setIsFormDirty(true);
  };

  // Handler Submit diubah untuk Presentasi
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi diubah ke field Presentasi
    if (!formData.jenjang || !formData.kelas || !formData.topik) {
      toast.error("Jenjang, Kelas, dan Topik Presentasi wajib diisi!");
      return;
    }
    toast.success("Permintaan Kerangka Presentasi dikirim ke AI...");
    dispatch(generatePresentasi(formData)); // <-- Dispatch aksi baru
    setIsFormDirty(false);
    if (window.innerWidth < 1024) {
      setIsFormVisible(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      {/* Baris 1: Jenjang & Kelas (Salin) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang</label>
          <select
            name="jenjang"
            value={formData.jenjang}
            onChange={handleJenjangChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Jenjang</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
          </select>
          <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
          <select
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            disabled={!formData.jenjang}
            className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Pilih Kelas</option>
            {kelasOptions.map((kelas) => (
              <option key={kelas} value={kelas}>
                {kelas}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Baris 2: Mata Pelajaran (Salin) */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
        <select
          name="mapel"
          value={formData.mapel}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Mata Pelajaran</option>
          <option value="Pendidikan Agama">Pendidikan Agama</option>
          <option value="Bahasa Indonesia">Bahasa Indonesia</option>
          <option value="Matematika">Matematika</option>
          <option value="IPA">IPA</option>
          <option value="IPS">IPS</option>
        </select>
        <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Baris 3: Mapel Kustom (Salin) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mata Pelajaran Kustom (Opsional)
        </label>
        <input
          type="text"
          name="mapelKustom"
          value={formData.mapelKustom}
          onChange={handleChange}
          placeholder="Jika tidak ada di daftar..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* --- Bagian B: Info Spesifik Presentasi --- */}
      <hr className="my-4 border-t border-gray-200" />

      {/* Baris 4: Topik/Judul Presentasi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topik/Judul Presentasi
        </label>
        <input
          type="text"
          name="topik"
          value={formData.topik}
          onChange={handleChange}
          placeholder="Contoh: Dampak Perubahan Iklim di Indonesia"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Baris 5: Tujuan Pembelajaran Presentasi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tujuan Pembelajaran Presentasi
        </label>
        <textarea
          name="tujuan"
          rows="3"
          value={formData.tujuan}
          onChange={handleChange}
          placeholder="Siswa mampu mengidentifikasi 3 dampak utama..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Baris 6: Estimasi Durasi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estimasi Durasi Presentasi
        </label>
        <input
          type="text"
          name="durasi"
          value={formData.durasi}
          onChange={handleChange}
          placeholder="Contoh: 30 menit (termasuk Q&A)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Baris 7: Instruksi Khusus (Sama) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instruksi Khusus (Opsional)
        </label>
        <textarea
          name="instruksi"
          rows="2"
          value={formData.instruksi}
          onChange={handleChange}
          placeholder="Fokus pada studi kasus di Kalimantan..."
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
        {/* Ganti teks tombol */}
        {isLoading ? "Sedang Membuat..." : "Hasilkan Kerangka Presentasi"}
      </button>
    </form>
  );
};

export default PresentasiForm;
