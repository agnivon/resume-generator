import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "roboto-mono": ["RobotoMono", "sans-serif"],
      "ar-one-sans": ["ArOneSans", "sans-serif"],
      merriweather: ["Merriweather", "sans-serif"],
      "source-sans": ["SourceSans3", "sans-serif"],
      "dejavu-serif": ["DejaVuSerif", "sans-serif"],
    },
    extend: {
      keyframes: {
        vibrate: {
          from: { transform: "rotate(-2deg)" },
          to: { transform: "rotate(2deg)" },
        },
      },
      animation: {
        vibrate: "vibrate 0.15s linear infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
export default config;
