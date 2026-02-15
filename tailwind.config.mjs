/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Warmer, softer blue — inviting, not corporate
        brand: {
          50: '#F0F4FF',
          100: '#DDE6FD',
          200: '#BCCDFB',
          300: '#93AEF8',
          400: '#6B8FF5',
          500: '#4A6CF7',  // Primary — warm periwinkle
          600: '#3B56D4',
          700: '#2D42B0',
          800: '#1F2E8C',
          900: '#141E5A',
        },
        // Warmer creme — more linen
        warm: {
          50: '#FFEDCC',
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
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
        // Keep sapphire for backwards compat during transition
        sapphire: {
          50: '#F0F4FF',
          100: '#DDE6FD',
          200: '#BCCDFB',
          300: '#93AEF8',
          400: '#6B8FF5',
          500: '#4A6CF7',
          600: '#3B56D4',
          700: '#2D42B0',
          800: '#1F2E8C',
          900: '#141E5A',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
