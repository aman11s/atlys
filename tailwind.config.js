/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #f1f1f1 2px, transparent 1px)",
      },
      backgroundSize: {
        16: "16px 16px",
      },
    },
  },
  plugins: [],
};
