// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase'

  ],
  supabase: {
    redirect: false, // We're handling redirects manually
  },
  googleFonts: {
    families: {
      alice: [400, 700],          // regular & bold
      playfair: [400, 700],       // regular & bold
      Satisfy: true,              // only regular
      lora: [400, 700, 900],           // regular & bold
    },
    display: 'swap',              // optional, improves font rendering
    prefetch: true,
    preconnect: true,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  }
})