import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src', '~': '/node_modules' } },
  plugins: [
    vue(),
    VueI18n({
      // define the locales files directory
      include: [resolve(__dirname, 'src/locales/**')],
    }),
  ],
  server: {
    host: true,
  } 
})
