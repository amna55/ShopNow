// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true, // server-side rendering enabled
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase'
  ],
  pwa:{
    manifest: {
      name: 'ShopNow',
      short_name: 'ShopNow',
      display: 'standalone',
      description: 'Your offline-capable shopping list app',
      start_url: '/',
      display_override: ['standalone'],
      background_color: '#ffffff',
      theme_color: '#22c55e',
  },
  workbox: {
      runtimeCaching: [
        {
          urlPattern: '/api/.*', // cache API requests
          handler: 'NetworkFirst', // try network first, fallback to cache
        },
        {
          urlPattern: '/*.{js,css,html,png,svg}', // cache static assets
          handler: 'CacheFirst',
        },
      ],
  }
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
  }
})