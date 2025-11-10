import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Jika frontend (di localhost:5173) memanggil '/api/...'
      // Vite akan meneruskannya ke server backend Anda
      "/api": {
        target: "http://localhost:5000", // Alamat backend Anda
        changeOrigin: true, // Diperlukan untuk vVirtual host
        secure: false, // Abaikan jika backend Anda http (bukan https)
      },
    },
  },
});
