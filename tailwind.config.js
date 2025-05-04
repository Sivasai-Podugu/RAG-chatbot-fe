/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eef6ff',
          100: '#d8eaff',
          200: '#b8d9ff',
          300: '#8ac2ff',
          400: '#549eff',
          500: '#2b7fff',
          600: '#1a6eff',
          700: '#0047e1',
          800: '#0036ab',
          900: '#002c8a',
        },
        purple: {
          50: '#f6f4ff',
          100: '#edebff',
          200: '#dcd5ff',
          300: '#c3b4ff',
          400: '#a385ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
};