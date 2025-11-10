import { GoogleGenerativeAI } from "@google/generative-ai";

// --- FUNGSI HELPER GEMINI ---
// Fungsi ini mengubah buffer file (dari multer) menjadi format API Gemini
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

export const modulAjarGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form dari request frontend
    const {
      jenjang,
      kelas,
      mapel,
      mapelKustom,
      topik,
      capaian,
      model: modelPembelajaran,
      alokasi,
      instruksi,
    } = req.body;

    const mataPelajaran = mapelKustom || mapel;

    const prompt = `
      Anda adalah "Asisten Guru AI" yang ahli dalam pedagogi dan kurikulum pendidikan di Indonesia.
      Tugas Anda adalah membuat RPP / Modul Ajar yang lengkap dan profesional berdasarkan data berikut.

        **PERHATIKAN:** Hasilkan output dalam format **MARKDOWN**.
        1. Gunakan HANYA GitHub-Flavored Markdown (GFM).
        2. JANGAN PERNAH MENGGUNAKAN TAG HTML. Ini termasuk <br>, <b>, <i>, <ul>, <li>, dll. Gunakan pemformatan Markdown murni.
        3. UNTUK BARIS BARU: Gunakan baris baru Markdown (tekan Enter dua kali untuk paragraf baru, atau gunakan dua spasi di akhir baris untuk baris baru). JANGAN GUNAKAN <br>
        4. UNTUK LIST: Gunakan tanda bintang (*) atau angka (1.). JANGAN GUNAKAN <ul> atau <li>.
        6. UNTUK RUMUS: Gunakan sintaks LaTeX (diapit $...$ atau $$...$$).

        ATURAN KHUSUS UNTUK TABEL:
        1. Gunakan sintaks GFM yang benar (menggunakan | dan -).
        2. WAJIB: Jumlah kolom di baris header HARUS SAMA PERSIS dengan jumlah kolom di baris pemisah (delimiter row).
          Contoh BENAR (3 kolom):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|:---|
          | Isi 1 | Isi 2 | Isi 3 |
          
          Contoh SALAH (Header 3, Pemisah 2):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|


        Berikut adalah detail untuk Modul Ajar yang harus Anda buat:

        * **Jenjang:** ${jenjang}
        * **Kelas:** ${kelas}
        * **Mata Pelajaran:** ${mataPelajaran}
        * **Topik/Materi Utama:** ${topik}
        * **Capaian Pembelajaran/Tujuan:** ${capaian}
        * **Model Pembelajaran:** ${modelPembelajaran || "Belum ditentukan"}
        * **Alokasi Waktu:** ${alokasi || "Belum ditentukan"}
        
        **Instruksi Khusus (Opsional):**
        ${instruksi || "Tidak ada instruksi khusus."}

        Buatlah Modul Ajar yang rinci, sistematis, dan siap pakai, mencakup komponen-komponen utama seperti:
        1.  Informasi Umum (Identitas Modul)
        2.  Kompetensi Awal
        3.  Profil Pelajar Pancasila (jika relevan)
        4.  Sarana dan Prasarana
        5.  Target Peserta Didik
        6.  Tujuan Pembelajaran
        7.  Pemahaman Bermakna
        8.  Pertanyaan Pemantik
        9.  Kegiatan Pembelajaran (Langkah-langkah rinci: Pendahuluan, Kegiatan Inti, Penutup)
        10. Asesmen (Penilaian)
        11. Pengayaan dan Remedial
        12. Refleksi Guru dan Peserta Didik
        13. Glosarium dan Daftar Pustaka (Opsional)

        Mulai sekarang.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};

export const lkpdGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form LKPD
    const {
      jenjang,
      kelas,
      mapel,
      mapelKustom,
      judul,
      kompetensi,
      petunjuk,
      instruksiTugas,
      instruksi, // Instruksi khusus
    } = req.body;

    const mataPelajaran = mapelKustom || mapel;

    // 2. Buat Prompt Engineering KHUSUS untuk LKPD
    const prompt = `
      Anda adalah "Asisten Guru AI" yang ahli dalam merancang Lembar Kerja Peserta Didik (LKPD) yang menarik dan efektif.
      Tugas Anda adalah membuat LKPD yang lengkap dan profesional berdasarkan data berikut.

      **PERHATIKAN:** Hasilkan output dalam format **MARKDOWN**.
        1. Gunakan HANYA GitHub-Flavored Markdown (GFM).
        2. JANGAN PERNAH MENGGUNAKAN TAG HTML. Ini termasuk <br>, <b>, <i>, <ul>, <li>, dll. Gunakan pemformatan Markdown murni.
        3. UNTUK BARIS BARU: Gunakan baris baru Markdown (tekan Enter dua kali untuk paragraf baru, atau gunakan dua spasi di akhir baris untuk baris baru). JANGAN GUNAKAN <br>
        4. UNTUK LIST: Gunakan tanda bintang (*) atau angka (1.). JANGAN GUNAKAN <ul> atau <li>.
        6. UNTUK RUMUS: Gunakan sintaks LaTeX (diapit $...$ atau $$...$$).

        ATURAN KHUSUS UNTUK TABEL:
        1. Gunakan sintaks GFM yang benar (menggunakan | dan -).
        2. WAJIB: Jumlah kolom di baris header HARUS SAMA PERSIS dengan jumlah kolom di baris pemisah (delimiter row).
          Contoh BENAR (3 kolom):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|:---|
          | Isi 1 | Isi 2 | Isi 3 |
          
          Contoh SALAH (Header 3, Pemisah 2):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|

      Data Input untuk LKPD:
      - Jenjang: ${jenjang}
      - Kelas: ${kelas}
      - Mata Pelajaran: ${mataPelajaran}
      - Judul LKPD/Aktivitas: ${judul}
      - Kompetensi Dasar/Materi Pokok: ${kompetensi}
      - Petunjuk Belajar & Tujuan Pembelajaran: ${petunjuk}
      - Instruksi Tugas Utama (Isian, Eksperimen, Proyek, dll.): ${instruksiTugas}
      - Instruksi Khusus (Opsional): ${instruksi || "Tidak ada"}

      Buatlah draf LKPD yang rinci dan sistematis, mencakup komponen:
      1. Judul LKPD
      2. Petunjuk Belajar dan Tujuan Pembelajaran
      3. Ringkasan Materi/Dasar Teori (Singkat, jika perlu)
      4. Alat dan Bahan (jika relevan, misal untuk eksperimen)
      5. Langkah-langkah Kegiatan/Instruksi Tugas (Ini adalah bagian utama, berdasarkan "Instruksi Tugas Utama")
      6. Pertanyaan/Tugas untuk Dikerjakan (Bagian untuk diisi siswa)
      7. (Opsional) Rubrik Penilaian Singkat

      Mulai generasi LKPD:
    `;

    // 3. Kirim prompt ke Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Kirim hasil kembali ke Frontend
    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini (LKPD):", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};

export const presentasiGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form
    const { jenjang, kelas, mapel, mapelKustom, topik, tujuan, durasi, instruksi } = req.body;

    const mataPelajaran = mapelKustom || mapel;

    // 2. Buat Prompt Engineering KHUSUS untuk Presentasi
    const prompt = `
      Anda adalah "Asisten Guru AI" yang ahli dalam instructional design dan merancang presentasi yang memukau dan efektif.
      Tugas Anda adalah membuat **KERANGKA (OUTLINE) PRESENTASI** yang lengkap, slide demi slide, berdasarkan data berikut.

      **PERHATIKAN:** Hasilkan output dalam format **MARKDOWN**.
        1. Gunakan HANYA GitHub-Flavored Markdown (GFM).
        2. JANGAN PERNAH MENGGUNAKAN TAG HTML. Ini termasuk <br>, <b>, <i>, <ul>, <li>, dll. Gunakan pemformatan Markdown murni.
        3. UNTUK BARIS BARU: Gunakan baris baru Markdown (tekan Enter dua kali untuk paragraf baru, atau gunakan dua spasi di akhir baris untuk baris baru). JANGAN GUNAKAN <br>
        4. UNTUK LIST: Gunakan tanda bintang (*) atau angka (1.). JANGAN GUNAKAN <ul> atau <li>.
        6. UNTUK RUMUS: Gunakan sintaks LaTeX (diapit $...$ atau $$...$$).
        7. Pastikan output diformat sebagai kerangka slide-demi-slide (misal: "Slide 1: Judul", "Slide 2: Pendahuluan", dst.).

        ATURAN KHUSUS UNTUK TABEL:
        1. Gunakan sintaks GFM yang benar (menggunakan | dan -).
        2. WAJIB: Jumlah kolom di baris header HARUS SAMA PERSIS dengan jumlah kolom di baris pemisah (delimiter row).
          Contoh BENAR (3 kolom):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|:---|
          | Isi 1 | Isi 2 | Isi 3 |
          
          Contoh SALAH (Header 3, Pemisah 2):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|

      Data Input untuk Presentasi:
      - Jenjang: ${jenjang}
      - Kelas: ${kelas}
      - Mata Pelajaran: ${mataPelajaran}
      - Topik/Judul Presentasi: ${topik}
      - Tujuan Pembelajaran Presentasi: ${tujuan}
      - Estimasi Durasi Presentasi: ${durasi}
      - Instruksi Khusus (Opsional): ${instruksi || "Tidak ada"}

      Buatlah kerangka presentasi yang rinci, mencakup:
      1.  **Slide Judul:** (Judul, Subjudul, Nama Pembuat)
      2.  **Slide Pendahuluan:** (Agenda, Tujuan Pembelajaran)
      3.  **Slide Isi (Beberapa slide):** (Pecah ${topik} menjadi poin-poin utama, tambahkan "Saran Poin Pembicaraan" atau "Catatan Pengajar" untuk setiap slide isi).
      4.  **Slide Kesimpulan:** (Rangkuman poin-poin penting)
      5.  **Slide Penutup:** (Q&A dan Terima Kasih)

      Mulai generasi kerangka presentasi:
    `;

    // 3. Kirim prompt ke Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Kirim hasil kembali ke Frontend
    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini (Presentasi):", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};

export const materiGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form
    const {
      judul,
      teksPanjang, // Teks input
      jenisOutput, // Ringkasan, Poin-poin, dll
      instruksi,
    } = req.body;

    // 2. Buat Prompt Engineering KHUSUS untuk Teks/Ringkasan
    const prompt = `
      Anda adalah "Asisten Guru AI" yang ahli dalam sintesis informasi, linguistik, dan penulisan materi ajar.
      Tugas Anda adalah mengambil "Teks Panjang/Poin-poin Materi" yang diberikan dan mengubahnya menjadi "Jenis Output" yang diminta.

      **PERHATIKAN:** Hasilkan output dalam format **MARKDOWN**.
        1. Gunakan HANYA GitHub-Flavored Markdown (GFM).
        2. JANGAN PERNAH MENGGUNAKAN TAG HTML. Ini termasuk <br>, <b>, <i>, <ul>, <li>, dll. Gunakan pemformatan Markdown murni.
        3. UNTUK BARIS BARU: Gunakan baris baru Markdown (tekan Enter dua kali untuk paragraf baru, atau gunakan dua spasi di akhir baris untuk baris baru). JANGAN GUNAKAN <br>
        4. UNTUK LIST: Gunakan tanda bintang (*) atau angka (1.). JANGAN GUNAKAN <ul> atau <li>.
        6. UNTUK RUMUS: Gunakan sintaks LaTeX (diapit $...$ atau $$...$$).

        ATURAN KHUSUS UNTUK TABEL:
        1. Gunakan sintaks GFM yang benar (menggunakan | dan -).
        2. WAJIB: Jumlah kolom di baris header HARUS SAMA PERSIS dengan jumlah kolom di baris pemisah (delimiter row).
          Contoh BENAR (3 kolom):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|:---|
          | Isi 1 | Isi 2 | Isi 3 |
          
          Contoh SALAH (Header 3, Pemisah 2):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|

      Data Input untuk diproses:
      - Judul Bahan Ajar: ${judul}
      - Teks Panjang/Poin-poin Materi (Input): ${teksPanjang}
      - Jenis Output yang Diminta: ${jenisOutput}
      - Instruksi Khusus (Opsional): ${instruksi || "Tidak ada"}

      Mulai proses dan hasilkan output sesuai dengan "Jenis Output yang Diminta".
      Pastikan hasilnya rapi, terstruktur dengan baik, dan akurat berdasarkan teks input.
    `;

    // 3. Kirim prompt ke Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Kirim hasil kembali ke Frontend
    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini (Materi):", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};

export const soalGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form
    const {
      jenjang,
      bentukSoal,
      tingkatKesulitan,
      taksonomiBloom,
      jumlahSoal,
      mapel,
      mapelKustom,
      topik,
      teksRef, // Teks Materi Referensi (Opsional)
      instruksi,
    } = req.body;

    const imageFile = req.file;

    const mataPelajaran = mapelKustom || mapel;

    // 2. Buat Prompt Engineering KHUSUS untuk SOAL
    const textPrompt = `
      Anda adalah "Asisten Guru AI" yang merupakan ahli dalam evaluasi dan asesmen (pembuatan soal) berdasarkan Taksonomi Bloom.
      Tugas Anda adalah membuat bank soal yang berkualitas tinggi berdasarkan data berikut.

      **PERHATIKAN:** Hasilkan output dalam format **MARKDOWN**.
      1. Gunakan HANYA GitHub-Flavored Markdown (GFM).
      2. JANGAN PERNAH MENGGUNAKAN TAG HTML. Ini termasuk <br>, <b>, <i>, <ul>, <li>, dll. Gunakan pemformatan Markdown murni.
      3. UNTUK BARIS BARU: Gunakan baris baru Markdown (tekan Enter dua kali untuk paragraf baru). JANGAN GUNAKAN <br>
      4. UNTUK LIST (seperti opsi Pilihan Ganda): Gunakan tanda bintang (*) atau strip (-).
      5. UNTUK RUMUS: Gunakan sintaks LaTeX (diapit $...$ atau $$...$$).
      
      ATURAN TABEL:
      1. Gunakan sintaks GFM yang benar (menggunakan | dan -).
      2. WAJIB: Jumlah kolom di header HARUS SAMA PERSIS dengan jumlah kolom di baris pemisah.

      ---
      **ATURAN PENOMORAN SOAL (SANGAT PENTING):**
      1. WAJIB gunakan **daftar bernomor (ordered list)** untuk semua soal.
      2. Mulai dari "1.", lalu "2.", "3.", dan seterusnya, hingga ${jumlahSoal} soal.
      3. JANGAN gunakan format lain (seperti bintang * atau strip -) untuk *memulai* soal.
         Contoh:
         1. Soal pertama...
         2. Soal kedua...
      ---

      ATURAN KUNCI JAWABAN (WAJIB):
      Setelah SEMUA soal selesai, buat bagian terpisah dengan judul "**Kunci Jawaban**" beserta penjelasannya.
      - Untuk Pilihan Ganda, sebutkan jawaban yang benar (misal: 1. A).
      - Untuk Esai, berikan jawaban ideal/poin-poin kunci.
      - Untuk Menjodohkan, berikan pasangan yang benar.

      ---
      Data Input untuk Pembuatan Soal:
      - Jenjang: ${jenjang}
      - Bentuk Soal: ${bentukSoal}
      - Tingkat Kesulitan: ${tingkatKesulitan}
      - Taksonomi Bloom (Level Kognitif): ${taksonomiBloom}
      - Jumlah Soal: ${jumlahSoal}
      - Mata Pelajaran: ${mataPelajaran}
      - Topik/Kata Kunci Soal (Wajib): ${topik}
      
      ${teksRef ? `- Teks Materi Referensi (Gunakan ini sebagai basis utama soal): ${teksRef}` : ""}
      ${instruksi ? `- Instruksi Khusus: ${instruksi}` : ""}
      
      ${imageFile ? `\n- GAMBAR REFERENSI: Buat soal berdasarkan gambar yang terlampir.` : ""}

      Buatlah ${jumlahSoal} soal dalam bentuk ${bentukSoal} sesuai kriteria di atas.
      Pastikan soal sesuai dengan level ${taksonomiBloom} dan ${tingkatKesulitan}.

      Mulai generasi soal (dimulai dari nomor 1.):
    `;

    const promptParts = [textPrompt];

    if (imageFile) {
      // Jika ada file, konversi dan tambahkan ke prompt array
      const imagePart = fileToGenerativePart(imageFile.buffer, imageFile.mimetype);
      promptParts.push(imagePart);
    }

    // 3. Kirim prompt ke Gemini
    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    // 4. Kirim hasil kembali ke Frontend
    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini (Soal):", error);
    // Cek error file terlalu besar dari multer
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Error upload file: ${error.message}. (Maks: 2MB)`,
      });
    }
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};

export const rubrikGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form
    const {
      jenjang,
      mapel,
      mapelKustom,
      jenisTugas,
      kriteria, // Kriteria Penilaian Spesifik
      instruksi,
    } = req.body;

    const mataPelajaran = mapelKustom || mapel;

    // 2. Buat Prompt Engineering KHUSUS untuk RUBRIK
    // Kita akan PAKSA AI menggunakan format tabel untuk rubrik
    const prompt = `
      Anda adalah "Asisten Guru AI" yang merupakan ahli dalam evaluasi dan perancangan rubrik penilaian (assessment rubric).
      Tugas Anda adalah membuat rubrik penilaian yang komprehensif dan jelas berdasarkan data berikut.

      **PERHATIKAN:** Hasilkan output dalam format **MARKDOWN**.
        1. Gunakan HANYA GitHub-Flavored Markdown (GFM).
        2. JANGAN PERNAH MENGGUNAKAN TAG HTML. Ini termasuk <br>, <b>, <i>, <ul>, <li>, dll. Gunakan pemformatan Markdown murni.
        3. UNTUK BARIS BARU: Gunakan baris baru Markdown (tekan Enter dua kali untuk paragraf baru, atau gunakan dua spasi di akhir baris untuk baris baru). JANGAN GUNAKAN <br>.
        4. WAJIB: Rubrik penilaian HARUS dibuat dalam format TABEL Markdown.
         - Kolom pertama adalah "Kriteria" (misal: ${kriteria}).
         - Kolom-kolom berikutnya adalah "Level Kinerja" (misal: "Sangat Baik (4)", "Baik (3)", "Cukup (2)", "Kurang (1)").
        5. Pastikan deskriptor untuk setiap sel tabel jelas, terukur, dan spesifik.
        6. UNTUK LIST: Gunakan tanda bintang (*) atau angka (1.). JANGAN GUNAKAN <ul> atau <li>.
        7. UNTUK RUMUS: Gunakan sintaks LaTeX (diapit $...$ atau $$...$$).

        ATURAN KHUSUS UNTUK TABEL:
        1. Gunakan sintaks GFM yang benar (menggunakan | dan -).
        2. WAJIB: Jumlah kolom di baris header HARUS SAMA PERSIS dengan jumlah kolom di baris pemisah (delimiter row).
          Contoh BENAR (3 kolom):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|:---|
          | Isi 1 | Isi 2 | Isi 3 |
          
          Contoh SALAH (Header 3, Pemisah 2):
          | Header 1 | Header 2 | Header 3 |
          |:---|:---|

      Data Input untuk Pembuatan Rubrik:
      - Jenjang: ${jenjang}
      - Mata Pelajaran: ${mataPelajaran}
      - Jenis Tugas yang Dinilai: ${jenisTugas}
      - Kriteria Penilaian Spesifik (Fokus Utama): ${kriteria}
      
      ${instruksi ? `- Instruksi Khusus: ${instruksi}` : ""}

      Buatlah rubrik penilaian dalam format tabel GFM yang siap pakai.
      Judul rubrik harus: "Rubrik Penilaian untuk: ${jenisTugas} - ${mataPelajaran}"

      Mulai generasi rubrik:
    `;

    // 3. Kirim prompt ke Gemini
    // Kita gunakan model teks biasa, karena rubrik tidak butuh gambar
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Kirim hasil kembali ke Frontend
    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini (Rubrik):", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};

export const iceBreakingGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form
    const { jenjang, mapel, mapelKustom, topik, estimasiWaktu, tujuan, instruksi } = req.body;

    const mataPelajaran = mapelKustom || mapel;

    // 2. Buat Prompt Engineering KHUSUS untuk ICE BREAKING
    const prompt = `
      Anda adalah "Asisten Guru AI" yang kreatif, energik, dan ahli dalam psikologi pendidikan serta manajemen kelas.
      Tugas Anda adalah membuat ide **Ice Breaking** yang relevan dan menarik berdasarkan data berikut.

      ATURAN FORMAT SANGAT PENTING:
      1. Gunakan HANYA GFM (GitHub-Flavored Markdown). JANGAN GUNAKAN TAG HTML.
      2. Format output harus jelas:
         - **Nama Kegiatan:** (Nama yang menarik)
         - **Estimasi Waktu:** ${estimasiWaktu}
         - **Tujuan:** ${tujuan}
         - **Alat & Bahan:** (Sebutkan jika ada, atau "Tidak ada")
         - **Instruksi Langkah-demi-Langkah:** (Gunakan daftar bernomor 1., 2., 3., ...)
         - **Kaitan dengan Materi:** (Jelaskan bagaimana ini terhubung dengan "${topik}")

      Data Input untuk Pembuatan Ice Breaking:
      - Jenjang: ${jenjang}
      - Mata Pelajaran: ${mataPelajaran}
      - Topik/Materi yang Akan Diajarkan: ${topik}
      - Estimasi Waktu: ${estimasiWaktu}
      - Tujuan Khusus Ice Breaking: ${tujuan}
      
      ${instruksi ? `- Instruksi Khusus: ${instruksi}` : ""}

      Buatlah 1-2 ide ice breaking yang kreatif dan sesuai dengan kriteria di atas.
      Pastikan instruksinya sangat jelas dan mudah diikuti oleh guru.

      Mulai generasi ice breaking:
    `;

    // 3. Kirim prompt ke Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Kirim hasil kembali ke Frontend
    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini (Ice Breaking):", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};

export const curhatGenerator = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Ambil data form
    const { permasalahan, instruksi } = req.body;

    // 2. Buat Prompt Engineering KHUSUS untuk KONSULTASI
    const prompt = `
      Anda adalah "Sahabat Guru AI", seorang konselor, mentor, dan motivator yang sangat empatik, bijak, dan puitis.
      Tugas Anda adalah mendengarkan permasalahan guru dan merespons dengan 3 bagian yang JELAS.

      ATURAN FORMAT SANGAT PENTING:
      1. Gunakan HANYA GFM (GitHub-Flavored Markdown). JANGAN GUNAKAN TAG HTML.
      2. Respons HARUS terdiri dari 3 bagian berikut dengan subjudul (menggunakan **bold**):

         **1. Validasi & Dukungan Empati:**
         (Mulai dengan validasi perasaan guru. Tunjukkan bahwa Anda memahami betapa beratnya masalah mereka. Gunakan bahasa yang hangat dan mendukung).

         **2. Solusi Konkret & Sudut Pandang Baru:**
         (Berikan 2-3 langkah praktis, strategi, atau perubahan mindset yang dapat guru terapkan untuk mengatasi masalah mereka).

         **3. Untaian Motivasi Puitis:**
         (Tutup respons Anda dengan sebuah paragraf singkat, puitis, dan membangkitkan semangat. Ini harus menjadi "untaian motivasi puitis" yang dijanjikan).

      Data Input (Curhatan Guru):
      - Permasalahan yang Dihadapi: ${permasalahan}
      - Instruksi Khusus (Opsional): ${instruksi || "Fokus pada solusi praktis."}

      Mulai respons Anda:
    `;

    // 3. Kirim prompt ke Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Kirim hasil kembali ke Frontend
    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error saat menghubungi Gemini (Curhat):", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server saat menghubungi AI.",
    });
  }
};
