// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  nitro: {
    // Сжимает public/ файлы  .br/.gz (-80%)
  // CSS из assets/scss/ сжимает Vite автоматически
    compressPublicAssets: true,
  },
  css: ["~/assets/scss/main.scss"],
  typescript: {
    typeCheck: true,
  },
})