/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Legacy mapping to keep existing classes working
        teal: {
          50: '#84F7F0',
          100: '#84F7F0',
          200: '#84F7F0',
          300: '#84F7F0',
          400: '#84F7F0',
          500: '#84F7F0',
          600: '#000000',
          700: '#000000',
          800: '#000000',
        },
        // Brand + trading semantics
        brand: {
          cyan: '#84F7F0',
          black: '#000000',
        },
        buy: '#00C853',
        sell: '#FF1744',
        profit: '#00E676',
        loss: '#FF5252',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'neumorphic': '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
