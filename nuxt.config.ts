export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/image'],
  nitro: {
    compressPublicAssets: true,
   
  },

  css: ["~/assets/scss/main.scss"],
  runtimeConfig: {
   
    jwtMagicTokenSecret: process.env.JWT_MAGIC_TOKEN_SECRET,
    
    smtpHost: process.env.SMTP_HOST,
    smtpPort: Number(process.env.SMTP_PORT),
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASSWORD,
  
    magicLink: process.env.MAGIC_LINK,
    activationRedirectURL: process.env.ACTIVATION_REDIRECT_URL,
    activationErrorRedirectURL: process.env.ERROR_PAGE_ACTIVATE
  }

})
