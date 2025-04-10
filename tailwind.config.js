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
        lg: '18px',
        xl: '19px',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
} 