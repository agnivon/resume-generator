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
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
export default config;
