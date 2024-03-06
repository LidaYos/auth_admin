import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// 按需导入element组件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // 路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 跨呀代理
  server: {
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:8001",
        target: "http://1.14.198.102:8001",
        changeOrigin: true,
        rewrite: path => path.replace("/api", ""),
      },
    },
  },
});
