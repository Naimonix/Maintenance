/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        maroon: {
          50: '#FDF2F3',
          100: '#FCE4E6',
          200: '#F9CDD2',
          300: '#F3A6AE',
          400: '#EA727F',
          500: '#DC4455',
          600: '#B82334',
          700: '#7A121D',
          800: '#630E17',
          900: '#4E0B12',
        },
        gold: {
          50: '#FEFCE8',
          100: '#FEF8C3',
          200: '#FCEE8A',
          300: '#F9DC4A',
          400: '#F2C522',
          500: '#D4A017',
          600: '#B07D0D',
          700: '#8A5B0C',
          800: '#724911',
          900: '#603C14',
        },
        primary: {
          50: '#FDF2F3',
          100: '#FCE4E6',
          200: '#F9CDD2',
          300: '#F3A6AE',
          400: '#EA727F',
          500: '#B82334',
          600: '#7A121D',
          700: '#630E17',
          800: '#4E0B12',
          900: '#3B080D',
        },
      },
    },
  },
  plugins: [],
};
