import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { clearResult } from "../store/generatorSlice";
import toast from "react-hot-toast";

// Ikon
import {
  FiLogOut,
  FiChevronDown,
  FiFileText,
  FiTarget,
  FiBookOpen,
  FiChevronUp,
  FiCopy,
  FiPrinter,
  FiDownload,
  FiCheckSquare,
  FiAirplay,
  FiAlignLeft,
  FiHelpCircle,
  FiGrid,
  FiSmile,
  FiHeart,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

// Komponen
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";

// --- STACK REACT-MARKDOWN (YANG DIMINTA) ---
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // <-- Plugin untuk Tabel
import remarkMath from "remark-math"; // <-- Plugin untuk $matematika$
import rehypeKatex from "rehype-katex"; // <-- Plugin untuk merender rumus
import rehypeRaw from "rehype-raw";
import { saveAs } from "file-saver";

import ModulAjarForm from "../components/ModulAjarForm";
import LkpdForm from "../components/LkpdForm";
import PresentasiForm from "../components/PresentasiForm";
import MateriForm from "../components/MateriForm";
import SoalForm from "../components/SoalForm";
import RubrikForm from "../components/RubrikForm";
import IceBreakingForm from "../components/IceBreakingForm";
import CurhatForm from "../components/CurhatForm";

const TabButton = ({ title, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      } transition-colors duration-200`}
    >
      {icon}
      <span className="ml-2">{title}</span>
    </button>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    result: hasilAI, // Teks MARKDOWN mentah dari AI
    status,
    error,
  } = useSelector((state) => state.generator);

  const isLoading = status === "loading";
  const outputRef = useRef(null); // Ref untuk div hasil

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("modulAjar");

  // useEffect untuk error generator
  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(`Error: ${error}`);
    }
  }, [status, error]);

  // useEffect untuk peringatan refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  // --- Handler Tombol ---
  const handleLogoutClick = () => setIsModalOpen(true);

  const confirmLogout = () => {
    dispatch(logout());
    dispatch(clearResult());
    toast.success("Berhasil logout!");
    setIsModalOpen(false);
  };

  // --- FUNGSI AKSI BARU (LANGKAH 5) ---

  // 1. Salin Teks
  const handleCopy = () => {
    if (!outputRef.current || !hasilAI) {
      toast.error("Tidak ada konten untuk disalin.");
      return;
    }
    navigator.clipboard
      .writeText(outputRef.current.innerText)
      .then(() => toast.success("Teks berhasil disalin!"))
      .catch(() => toast.error("Gagal menyalin teks."));
  };

  // 2. Download Word (METODE STABIL)
  const handleDownloadWord = () => {
    if (!outputRef.current || !hasilAI) {
      toast.error("Tidak ada konten untuk diunduh.");
      return;
    }

    const toastId = toast.loading("Membuat file Word...");

    try {
      const htmlContent = outputRef.current.innerHTML;

      // Trik "HTML-doc". Kita bungkus HTML kita dengan tag standar Word
      const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Hasil Ekspor</title></head>
      <body>
      <h1>${activeTab}: Hasil Generasi AI</h1><br/>
      `;
      const footer = "</body></html>";

      const sourceHtml = header + htmlContent + footer;

      const blob = new Blob([sourceHtml], {
        type: "application/msword",
      });

      saveAs(blob, `guru-digi-${activeTab}.doc`);
      // .doc adalah kuncinya. Ini memaksa Word untuk membuka file HTML

      toast.success("File Word (.doc) berhasil dibuat!", { id: toastId });
    } catch (e) {
      toast.error("Gagal membuat file Word.", { id: toastId });
      console.error(e);
    }
  };

  // 3. Cetak / PDF
  const handlePrint = () => {
    if (!outputRef.current || !hasilAI) {
      toast.error("Tidak ada konten untuk dicetak.");
      return;
    }
    window.print();
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    dispatch(clearResult()); // Hapus hasil AI lama
    setIsFormDirty(false); // Reset status form
  };

  const tabTitles = {
    modulAjar: "Generator Modul Ajar",
    lkpd: "Generator LKPD",
    presentasi: "Generator Kerangka Presentasi",
    materi: "Generator Teks & Ringkasan",
    soal: "Generator Bank Soal",
    rubrik: "Generator Rubrik Penilaian",
    iceBreaking: "Generator Ice Breaking",
    curhat: "Curhat Bareng (Konsultasi)",
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar Dashboard */}
        <nav className="bg-white shadow-sm sticky top-0 z-10 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <FiBookOpen className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-800">Asisten Guru AI</h1>
              </div>
              <div className="flex items-center">
                {user && (
                  <div className="flex items-center mr-4">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} alt="Profil" className="h-8 w-8 rounded-full" />
                    ) : (
                      <FaUserCircle className="h-8 w-8 text-gray-400" />
                    )}
                    <span className="hidden sm:block text-sm text-gray-600 ml-2">{user.name}</span>
                  </div>
                )}
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-300"
                >
                  <FiLogOut className="mr-0 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Konten Utama Dashboard */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 print:py-0">
          <div className="flex flex-col lg:flex-row lg:gap-8 print:block">
            {/* Kolom 1: Form Generator */}
            <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky lg:top-24 mb-8 lg:mb-0 print:hidden">
              {/* --- UI TABS BARU --- */}
              <div className="mb-4 border-b border-gray-200">
                <div className="flex overflow-x-auto whitespace-nowrap">
                  <TabButton
                    title="Modul Ajar"
                    icon={<FiFileText />}
                    isActive={activeTab === "modulAjar"}
                    onClick={() => handleTabChange("modulAjar")}
                  />
                  <TabButton
                    title="LKPD"
                    icon={<FiCheckSquare />}
                    isActive={activeTab === "lkpd"}
                    onClick={() => handleTabChange("lkpd")}
                  />
                  <TabButton
                    title="Presentasi"
                    icon={<FiAirplay />}
                    isActive={activeTab === "presentasi"}
                    onClick={() => handleTabChange("presentasi")}
                  />
                  <TabButton
                    title="Teks/Ringkasan"
                    icon={<FiAlignLeft />}
                    isActive={activeTab === "materi"}
                    onClick={() => handleTabChange("materi")}
                  />
                  <TabButton
                    title="Bank Soal"
                    icon={<FiHelpCircle />}
                    isActive={activeTab === "soal"}
                    onClick={() => handleTabChange("soal")}
                  />
                  <TabButton
                    title="Rubrik"
                    icon={<FiGrid />}
                    isActive={activeTab === "rubrik"}
                    onClick={() => handleTabChange("rubrik")}
                  />
                  <TabButton
                    title="Ice Breaking"
                    icon={<FiSmile />}
                    isActive={activeTab === "iceBreaking"}
                    onClick={() => handleTabChange("iceBreaking")}
                  />

                  <TabButton
                    title="Curhat Bareng"
                    icon={<FiHeart />}
                    isActive={activeTab === "curhat"}
                    onClick={() => handleTabChange("curhat")}
                  />
                  {/* Tambahkan tab baru di sini nanti */}
                </div>
              </div>

              {/* --- Judul & Tombol Dropdown (RESPONSIF) --- */}
              <div
                className="flex justify-between items-center cursor-pointer lg:cursor-default"
                onClick={() => window.innerWidth < 1024 && setIsFormVisible(!isFormVisible)}
              >
                <h2 className="md:text-2xl text-lg font-semibold text-gray-900 flex justify-center items-center">
                  {tabTitles[activeTab]} {/* Judul dinamis */}
                </h2>
                <button className="lg:hidden text-blue-600" aria-label="Toggle form">
                  {isFormVisible ? (
                    <FiChevronUp className="h-6 w-6" />
                  ) : (
                    <FiChevronDown className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* --- KONTEN FORM DINAMIS --- */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isFormVisible ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
                } lg:max-h-none lg:opacity-100 lg:mt-6`}
              >
                {/* Render form berdasarkan activeTab, pass state props */}
                {activeTab === "modulAjar" && (
                  <ModulAjarForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}
                {activeTab === "lkpd" && (
                  <LkpdForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}
                {activeTab === "presentasi" && (
                  <PresentasiForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}

                {activeTab === "materi" && (
                  <MateriForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}

                {activeTab === "soal" && (
                  <SoalForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}

                {activeTab === "rubrik" && (
                  <RubrikForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}

                {activeTab === "iceBreaking" && (
                  <IceBreakingForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}

                {activeTab === "curhat" && (
                  <CurhatForm
                    isFormDirty={isFormDirty}
                    setIsFormDirty={setIsFormDirty}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}
              </div>
            </div>

            {/* Kolom 2: Hasil Generasi AI */}
            <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg print:w-full print:shadow-none print:p-0 flex flex-col min-h-[80vh] lg:min-h-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 print:hidden">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <FiTarget className="mr-3 text-blue-600" />
                  Hasil Generasi AI
                </h2>

                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={handleCopy}
                    disabled={!hasilAI || isLoading}
                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 disabled:opacity-50"
                  >
                    <FiCopy className="mr-2 h-4 w-4" />
                    Salin
                  </button>
                  <button
                    onClick={handleDownloadWord}
                    disabled={!hasilAI || isLoading}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    <FiDownload className="mr-2 h-4 w-4" />
                    Word
                  </button>
                  <button
                    onClick={handlePrint}
                    disabled={!hasilAI || isLoading}
                    className="flex items-center px-3 py-2 bg-red-600 text-gray-100 rounded-md text-sm hover:bg-red-500 disabled:opacity-50"
                  >
                    <FiPrinter className="mr-2 h-4 w-4" />
                    Cetak/PDF
                  </button>
                </div>
              </div>

              <div className="h-[60vh] lg:h-full overflow-y-auto rounded-lg bg-gray-50 p-4 border print:h-auto print:overflow-visible print:border-none print:p-0">
                {/* Area Konten Hasil AI (sekarang di dalam wrapper scroll) */}
                {isLoading && <LoadingSpinner />}

                {!isLoading && hasilAI && (
                  <div ref={outputRef} className="prose prose-lg max-w-none prose-blue">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex, rehypeRaw]}
                    >
                      {hasilAI}
                    </ReactMarkdown>
                  </div>
                )}

                {!isLoading && !hasilAI && (
                  <p className="text-gray-500">Hasil generasi AI akan muncul di sini.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Logout"
      >
        <p>Apakah Anda yakin ingin keluar dari Asisten Guru AI?</p>
      </ConfirmModal>
    </>
  );
};

export default Dashboard;
