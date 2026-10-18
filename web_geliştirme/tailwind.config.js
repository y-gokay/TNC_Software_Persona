export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 25, 21, 0.04), 0 10px 28px rgba(28, 25, 21, 0.05)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.4s ease both",
      },
    },
  },
  plugins: [],
};
