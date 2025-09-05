import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "src", // 指定 src 為專案根目錄，Vite會以此尋找 index.html
  plugins: [vue()],
  server: {
    port: 5173, // 可指定啟動端口，與你終端顯示相符
  },
  build: {
    outDir: "../dist", // 編譯輸出目錄
  },
});
