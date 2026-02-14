/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sapphire: {
          50: '#EEF3FB',
          100: '#D4E0F5',
          200: '#A9C1EB',
          300: '#7EA2E1',
          400: '#5383D7',
          500: '#0F52BA',
          600: '#0C4295',
          700: '#093170',
          800: '#06214A',
          900: '#031025',
        },
        creme: {
          50: '#FFFDFB',
          100: '#FFF9F2',
          200: '#FFF3E5',
          300: '#FFEDD8',
          400: '#FFE7CB',
          500: '#FAF0E6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
