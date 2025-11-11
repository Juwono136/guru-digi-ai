import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Assets and icons
import { FiZap, FiChevronDown } from "react-icons/fi";

// Features
import { generateLkpd } from "../store/generatorSlice";

const kelasData = {
  SD: ["1", "2", "3", "4", "5", "6"],
  SMP: ["7", "8", "9"],
  SMA: ["10", "11", "12"],
};

const LkpdForm = ({ isFormDirty, setIsFormDirty, setIsFormVisible }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.generator);
  const isLoading = status === "loading";

  const [formData, setFormData] = useState({
    jenjang: "",
    kelas: "",
    mapel: "",
    mapelKustom: "",
    judul: "",
    kompetensi: "",
    petunjuk: "",
    instruksiTugas: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jenjang || !formData.kelas || !formData.judul) {
      toast.error("Jenjang, Kelas, dan Judul LKPD wajib diisi!");
      return;
    }
    toast.success("Permintaan LKPD dikirim ke AI... mohon tunggu...");
    dispatch(generateLkpd(formData));
    setIsFormDirty(false);
    if (window.innerWidth < 1024) {
      setIsFormVisible(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
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

      <hr className="my-4 border-t border-gray-200" />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul LKPD/Aktivitas</label>
        <input
          type="text"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          placeholder="Contoh: Eksplorasi Ekosistem Laut"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kompetensi Dasar atau Materi Pokok
        </label>
        <textarea
          name="kompetensi"
          rows="3"
          value={formData.kompetensi}
          onChange={handleChange}
          placeholder="Menganalisis interaksi antar komponen..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Petunjuk Belajar & Tujuan Pembelajaran
        </label>
        <textarea
          name="petunjuk"
          rows="3"
          value={formData.petunjuk}
          onChange={handleChange}
          placeholder="1. Bacalah... 2. Siswa mampu..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instruksi Tugas Utama (Isian, Eksperimen, dll)
        </label>
        <textarea
          name="instruksiTugas"
          rows="4"
          value={formData.instruksiTugas}
          onChange={handleChange}
          placeholder="Jawablah pertanyaan berikut... / Lakukan langkah..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
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
          placeholder="Contoh: Terapkan kurikulum KBC Kemenag..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        <FiZap className="mr-2" />
        {isLoading ? "Sedang Membuat..." : "Hasilkan LKPD"}
      </button>
    </form>
  );
};

export default LkpdForm;
