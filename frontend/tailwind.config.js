/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'google-blue': '#1a73e8',
        'google-blue-hover': '#1557b0',
        'google-gray': '#5f6368',
        'google-gray-light': '#f1f3f4',
        'google-border': '#dadce0',
        dark: {
          background: '#121212',
          text: '#e0e0e0',
          card: '#1e1e1e',
          border: '#2c2c2c',
        },
      },
    },
  },
  plugins: [],
}
