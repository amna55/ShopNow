/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {

      },
    },
    fontFamily: {
      lora: ['Lora', 'serif'],
      playfair: ['"Playfair Display"', 'serif'],
      satisfy: ['Satisfy', 'cursive'],
      arial: ['Arial', 'sans-serif'],
    },
    containers: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
}


