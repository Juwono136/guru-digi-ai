import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Assets and icons
import { FiZap, FiChevronDown } from "react-icons/fi";

// Features
import { generateIceBreaking } from "../store/generatorSlice";

const IceBreakingForm = ({ isFormDirty, setIsFormDirty, setIsFormVisible }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.generator);
  const isLoading = status === "loading";

  const [formData, setFormData] = useState({
    jenjang: "",
    mapel: "",
    mapelKustom: "",
    topik: "",
    estimasiWaktu: "10 menit",
    tujuan: "Mencairkan suasana",
    instruksi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!isFormDirty) setIsFormDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jenjang || !formData.topik || !formData.tujuan) {
      toast.error("Jenjang, Topik, dan Tujuan wajib diisi!");
      return;
    }

    toast.success("Permintaan Ice Breaking dikirim ke AI...");
    dispatch(generateIceBreaking(formData));

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
          <option value="SMK">SMK</option>
          <option value="Umum">Umum</option>
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
          <option value="Pendidikan Agama dan Budi Pekerti">
            Pendidikan Agama dan Budi Pekerti
          </option>
          <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
          <option value="Bahasa Indonesia">Bahasa Indonesia</option>
          <option value="Matematika">Matematika</option>
          <option value="Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)">
            Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)
          </option>
          <option value="Seni Budaya">Seni Budaya</option>
          <option value="Bahasa Inggris">Bahasa Inggris</option>
          <option value="Muatan Lokal">Muatan Lokal</option>
          <option value="Ilmu Pengetahuan Alam (IPA)">Ilmu Pengetahuan Alam (IPA)</option>
          <option value="Ilmu Pengetahuan Sosial (IPS)">Ilmu Pengetahuan Sosial (IPS)</option>
          <option value="Informatika">Informatika</option>
          <option value="Pendidikan Kewarganegaraan">Pendidikan Kewarganegaraan</option>
          <option value="Fisika">Fisika</option>
          <option value="Kimia">Kimia</option>
          <option value="Biologi">Biologi</option>
          <option value="Ekonomi">Ekonomi</option>
          <option value="Antropologi">Antropologi</option>
          <option value="Geografi">Geografi</option>
          <option value="Sosiologi">Sosiologi</option>
          <option value="Prakarya">Prakarya</option>
          <option value="Kewirausahaan">Kewirausahaan</option>
          <option value="Vokasi">Vokasi</option>
          <option value="Lainnya/Kustom">Lainnya/Kustom</option>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topik/Materi yang Akan Diajarkan
        </label>
        <input
          type="text"
          name="topik"
          value={formData.topik}
          onChange={handleChange}
          placeholder="Contoh: Persamaan Linear, Sumpah Pemuda"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Estimasi Waktu</label>
          <select
            name="estimasiWaktu"
            value={formData.estimasiWaktu}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5 menit">5 menit</option>
            <option value="10 menit">10 menit</option>
            <option value="15 menit">15 menit</option>
            <option value="30 menit">30 menit</option>
          </select>
          <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Khusus</label>
          <select
            name="tujuan"
            value={formData.tujuan}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Mencairkan suasana">Mencairkan suasana</option>
            <option value="Meningkatkan fokus">Meningkatkan fokus</option>
            <option value="Merefleksi materi">Merefleksi materi</option>
            <option value="Kerja sama tim">Kerja sama tim</option>
            <option value="Kombinasi (fokus & kerja tim)">Kombinasi</option>
          </select>
          <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
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
          placeholder="Contoh: Hindari aktivitas fisik berlebihan..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        <FiZap className="mr-2" />
        {isLoading ? "Sedang Membuat..." : "Hasilkan Ice Breaking"}
      </button>
    </form>
  );
};

export default IceBreakingForm;
