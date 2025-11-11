import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Assets and icons
import { FiZap, FiChevronDown } from "react-icons/fi";

// Features
import { generateRubrik } from "../store/generatorSlice";

const RubrikForm = ({ isFormDirty, setIsFormDirty, setIsFormVisible }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.generator);
  const isLoading = status === "loading";

  const [formData, setFormData] = useState({
    jenjang: "",
    mapel: "",
    mapelKustom: "",
    jenisTugas: "",
    kriteria: "",
    instruksi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!isFormDirty) setIsFormDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jenjang || !formData.mapel || !formData.jenisTugas || !formData.kriteria) {
      toast.error("Jenjang, Mata Pelajaran, Jenis Tugas, dan Kriteria wajib diisi!");
      return;
    }

    toast.success("Permintaan Rubrik Penilaian dikirim ke AI...");
    dispatch(generateRubrik(formData));

    setIsFormDirty(false);
    if (window.innerWidth < 1024) {
      setIsFormVisible(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang</label>
        <select
          name="jenjang"
          value={formData.jenjang}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Jenjang</option>
          <option value="SD">SD</option>
          <option value="SMP">SMP</option>
          <option value="SMA">SMA</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
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
          <option value="Semua Mapel">Semua Mapel</option>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Tugas</label>
        <input
          type="text"
          name="jenisTugas"
          value={formData.jenisTugas}
          onChange={handleChange}
          placeholder="Misal: Proyek, Esai, Presentasi, Portofolio..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kriteria Penilaian Spesifik
        </label>
        <textarea
          name="kriteria"
          rows="4"
          value={formData.kriteria}
          onChange={handleChange}
          placeholder="Contoh: Kedalaman analisis, kelengkapan data, penggunaan bahasa baku, originalitas ide, kerjasama tim..."
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
          placeholder="Contoh: Berikan bobot lebih pada sikap..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        <FiZap className="mr-2" />
        {isLoading ? "Sedang Membuat..." : "Hasilkan Rubrik Penilaian"}
      </button>
    </form>
  );
};

export default RubrikForm;
