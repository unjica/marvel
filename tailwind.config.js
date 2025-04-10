/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        marvel: {
          red: '#DD2C2C',
        }
      },
      fontSize: {
        base: '17px',
        sm: '15px',
        lg: '19px',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
} 