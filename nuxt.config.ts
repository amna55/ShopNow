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
  },
  pwa: {
  manifest: {
    name: 'ShopNow - Shopping List',
    short_name: 'ShopNow',
    description: 'Your personal shopping list app',
    theme_color: '#10b981',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
          src: 'icon-192x192.png',  // Essential for Android
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon-512x512.png',  // Essential for splash screens
          sizes: '512x512',
          type: 'image/png'
        }
    ]
  },
  workbox: {
    navigateFallback: '/'
  }
}
})