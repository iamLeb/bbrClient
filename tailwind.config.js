/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#57737A", // default primary color
        },
        secondary: {},
      },

      backgroundImage: {
        'banner': "url('https://tunatheme.com/tf/html/quarter-preview/quarter/img/slider/11.jpg')"
      }
    },
  },
  plugins: [],
}

// FEB800