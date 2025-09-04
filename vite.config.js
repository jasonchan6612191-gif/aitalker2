import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/line/webhook": "http://localhost:3000",
      "/whatsapp/webhook": "http://localhost:3000",
    },
  },
});
