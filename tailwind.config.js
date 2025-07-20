// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable class-based dark mode
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",  // your Next.js app folder files
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      // add others if needed
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  