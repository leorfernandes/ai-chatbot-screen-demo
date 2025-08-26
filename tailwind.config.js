/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(124, 58, 237)',
        secondary: 'rgba(37, 99, 235)',
        accent: 'rgba(219, 39, 119)',
        dark: 'rgba(55, 65, 81)',
        light: 'rgba(229, 231, 235)'
      },
     
    },
  },
  plugins: [],
}
