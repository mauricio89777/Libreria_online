/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50", // El color que quieres para 'bg-primary'
        "primary-foreground": "#ffffff", // El color que quieres para 'text-primary-foreground'
      },
    },
  },
  plugins: [],
};
