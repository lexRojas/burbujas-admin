import type { Config } from "tailwindcss";
import { content, plugin } from "flowbite-react/tailwind";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    content(),
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [plugin()],
} satisfies Config;
