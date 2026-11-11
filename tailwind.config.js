/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        cream: { DEFAULT: "#FFF7EC", deep: "#FCEBD3" },
        ink: { DEFAULT: "#1F1A3D", soft: "#4A4566" },
        coral: { DEFAULT: "#FF5B3A", light: "#FFE1D8" },
        sun: { DEFAULT: "#FFC93C", light: "#FFF0C2" },
        mint: { DEFAULT: "#2ED3A0", light: "#CDF6E6", glow: "#5CF2C9" },
        sky: { DEFAULT: "#4CB8FF", light: "#D9EFFF" },
        lilac: { DEFAULT: "#9B7BFF", light: "#E9E1FF" },
        bubble: { DEFAULT: "#FF7EB6", light: "#FFE0EE" },
        focus: "#5B4BFF",
      },
      fontFamily: {
        display: ['"Fredoka"', "ui-rounded", "system-ui", "sans-serif"],
        sans: ['"Nunito"', "ui-rounded", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pop: "4px 4px 0 0 #1F1A3D",
        "pop-sm": "3px 3px 0 0 #1F1A3D",
        "pop-lg": "7px 7px 0 0 #1F1A3D",
      },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        wiggle: {
          "0%,100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        wiggle: "wiggle .5s ease-in-out",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
}
