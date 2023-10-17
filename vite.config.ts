import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), electron([
    {
      entry: "./electron/main/index",
    },
  ]
  ), renderer()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: '.',
    sourcemap: true,
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./electron/rendered"),
      "@main": resolve(__dirname, "./electron/main"),
    },
  },
})
