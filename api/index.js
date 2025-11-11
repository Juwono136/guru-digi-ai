import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

// controllers
import {
  curhatGenerator,
  iceBreakingGenerator,
  lkpdGenerator,
  materiGenerator,
  modulAjarGenerator,
  presentasiGenerator,
  rubrikGenerator,
  soalGenerator,
} from "./controllers/generator.js";
import { loginWithPassword } from "./controllers/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // Batas 2MB
});

app.get("/", (req, res) => {
  res.send("Selamat datang di API Asisten Guru AI!");
});

app.post("/api/login/password", loginWithPassword);
app.post("/api/generate/modul-ajar", modulAjarGenerator);
app.post("/api/generate/lkpd", lkpdGenerator);
app.post("/api/generate/presentasi", presentasiGenerator);
app.post("/api/generate/materi", materiGenerator);
app.post("/api/generate/soal", upload.single("imageFile"), soalGenerator);
app.post("/api/generate/rubrik", rubrikGenerator);
app.post("/api/generate/ice-breaking", iceBreakingGenerator);
app.post("/api/generate/curhat", curhatGenerator);

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server LOKAL berjalan di http://localhost:${PORT}`);
  });
}
