import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Assets and icons
import { FiZap, FiChevronDown, FiUpload, FiX, FiPaperclip } from "react-icons/fi";

// Features
import { generateSoal } from "../store/generatorSlice";

const SoalForm = ({ isFormDirty, setIsFormDirty, setIsFormVisible }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.generator);
  const isLoading = status === "loading";

  const [formData, setFormData] = useState({
    jenjang: "",
    bentukSoal: "",
    tingkatKesulitan: "Sedang",
    taksonomiBloom: "C3 (Mengaplikasikan)",
    jumlahSoal: 10,
    mapel: "",
    mapelKustom: "",
    topik: "",
    teksRef: "",
    instruksi: "",
  });

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!isFormDirty) setIsFormDirty(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validasi ukuran (2MB)
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error("File terlalu besar! Maksimal 2MB.");
        e.target.value = null;
        return;
      }

      // Validasi tipe
      if (!["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)) {
        toast.error("Format file salah! Hanya JPG, JPEG, atau PNG.");
        e.target.value = null;
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      if (!isFormDirty) setIsFormDirty(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jenjang || !formData.topik || !formData.jumlahSoal) {
      toast.error("Jenjang, Topik, dan Jumlah Soal wajib diisi!");
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (file) {
      data.append("imageFile", file);
    }

    toast.success("Permintaan Bank Soal dikirim ke AI...");
    dispatch(generateSoal(data));

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
            onChange={handleChange}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Bentuk Soal</label>
          <select
            name="bentukSoal"
            value={formData.bentukSoal}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Bentuk Soal</option>
            <option value="Pilihan Ganda">Pilihan Ganda</option>
            <option value="Esai Singkat">Esai Singkat</option>
            <option value="Esai Panjang">Esai Panjang</option>
            <option value="Benar/Salah">Benar/Salah</option>
            <option value="Menjodohkan">Menjodohkan</option>
          </select>
          <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Kesulitan</label>
          <select
            name="tingkatKesulitan"
            value={formData.tingkatKesulitan}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Mudah">Mudah</option>
            <option value="Sedang">Sedang</option>
            <option value="Sulit">Sulit</option>
          </select>
          <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Taksonomi Bloom</label>
          <select
            name="taksonomiBloom"
            value={formData.taksonomiBloom}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="C1 (Mengingat)">C1 (Mengingat)</option>
            <option value="C2 (Memahami)">C2 (Memahami)</option>
            <option value="C3 (Mengaplikasikan)">C3 (Mengaplikasikan)</option>
            <option value="C4 (Menganalisis)">C4 (Menganalisis)</option>
            <option value="C5 (Mengevaluasi)">C5 (Mengevaluasi)</option>
            <option value="C6 (Menciptakan)">C6 (Menciptakan)</option>
          </select>
          <FiChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Jumlah Soal (Maks 50)
        </label>
        <input
          type="number"
          name="jumlahSoal"
          value={formData.jumlahSoal}
          onChange={handleChange}
          max="50"
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topik/Kata Kunci Soal (Wajib)
        </label>
        <input
          type="text"
          name="topik"
          value={formData.topik}
          onChange={handleChange}
          placeholder="Contoh: Fotosintesis, Perang Diponegoro"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teks Materi Referensi (Opsional)
        </label>
        <textarea
          name="teksRef"
          rows="5"
          value={formData.teksRef}
          onChange={handleChange}
          placeholder="Salin-tempel (paste) materi referensi di sini..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Foto Materi (Opsional)
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />

        <label
          htmlFor="file-upload"
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
        >
          <div className="space-y-1 text-center">
            <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <span className="relative font-medium text-blue-600 hover:text-blue-500">
                Klik untuk upload
              </span>
              <p className="pl-1">atau drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG (Maks. 2MB)</p>
          </div>
        </label>

        {fileName && (
          <div className="mt-2 flex items-center justify-between p-2 bg-gray-100 rounded-md">
            <div className="flex items-center space-x-2 truncate">
              <FiPaperclip className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700 truncate">{fileName}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setFileName("");
                document.getElementById("file-upload").value = null;
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        )}
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
          placeholder="Contoh: Buat soal HOTS..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        <FiZap className="mr-2" />
        {isLoading ? "Sedang Membuat..." : "Hasilkan Bank Soal"}
      </button>
    </form>
  );
};

export default SoalForm;
