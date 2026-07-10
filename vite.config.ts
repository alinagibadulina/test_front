import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss(), basicSsl()],
  server: {
    port: 3000,
    cors: false,
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        target: "https://testtask.public.indev.by",
      },
    },
  },
});
