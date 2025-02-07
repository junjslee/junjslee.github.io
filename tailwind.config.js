// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode via a CSS class
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
  