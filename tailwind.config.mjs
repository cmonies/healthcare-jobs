/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Warmer, softer blue — inviting, not corporate
        brand: {
          50: '#EEF0FE',
          100: '#D9DEFE',
          200: '#B3BCFD',
          300: '#8D9AFC',
          400: '#5872FA',
          500: '#244BF8',  // Primary
          600: '#1C3CD6',
          700: '#152EB3',
          800: '#0F2091',
          900: '#0A1560',
        },
        // Warmer creme — more linen
        warm: {
          50: '#FAF7F0',
          100: '#FFE4B5',
          200: '#FFD89E',
          300: '#FFCC87',
          400: '#FFC070',
          500: '#FFB459',
        },
        // Warm grays for light, cool neutrals for dark
        slate: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#232326',
          800: '#131313',
          900: '#08090A',
          950: '#000000',
        },
        // Dark mode surfaces (Carmen-picked 2026-02-15)
        surface: {
          page: '#0F0F0F',
          header: '#161718',
          footer: '#0C0D0D',
          card: '#161718',
          newsletter: '#161718',
          'card-hover': '#090D20',
        },
        // Keep sapphire for backwards compat during transition
        sapphire: {
          50: '#EEF0FE',
          100: '#D9DEFE',
          200: '#B3BCFD',
          300: '#8D9AFC',
          400: '#5872FA',
          500: '#244BF8',
          600: '#1C3CD6',
          700: '#152EB3',
          800: '#0F2091',
          900: '#0A1560',
        },
        creme: {
          50: '#FEFCFA',
          100: '#FDF8F3',
          200: '#FAF0E4',
          300: '#F5E6D3',
          400: '#EDD9C2',
          500: '#E8D0B5',
        },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'warm': '0 2px 8px 0 rgba(120, 113, 108, 0.08)',
        'warm-lg': '0 8px 24px 0 rgba(120, 113, 108, 0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
