import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pomo-deep-blue': ' #333853',
        'pomo-soft-blue': '#3C4262',
        'pomo-text-blue': '#A3A6B5',
        'pomo-green': '#219653',
        'pomo-green-1':'#BEA24E',
        'pomo-yellow': '#F2C94C',
        'pomo-arrow-blue': '#666C8B',
        'pomo-number-blue': '#9FA1AE'
      }
    },
  },
  plugins: [],
};
export default config;
