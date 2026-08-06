/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        impact : ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
        rockSalt : ["rockSalt", "sans-serif"],
        miloner : ["miloner", "sans-serif"],
        colitez : ["colitez", 'sans-serif'],
      },
    },
  },
}