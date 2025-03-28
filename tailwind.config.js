/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include Angular files for Tailwind
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2", // Example: Custom primary color
        secondary: "#FF6B6B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Example: Custom font
      },
    },
  },
  plugins: [require("daisyui")], // Add DaisyUI as a plugin

  // DaisyUI Config
  daisyui: {
    themes: ["cupcake","light", "dark", "cyberpunk"], // Enable multiple themes
    darkTheme: "light", // Default dark theme
  },
};


