import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true, // API isteklerini yönlendirmek için
      },
      // WebSocket bağlantılarını desteklemek için aşağıdaki proxy'yi ekleyin
      "/socket.io": {
        target: "http://localhost:5001",
        ws: true, // WebSocket desteği
        changeOrigin: true, // Origin kontrolünü atlar
        secure: false, // HTTPS kullanmıyorsanız devre dışı bırakın
        rewrite: (path) => path.replace(/^\/socket.io/, "/socket.io"),
      },
    },
  },
});
