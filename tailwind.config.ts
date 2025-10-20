import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#f8f7f4',
          100: '#eeebe3',
          200: '#ddd7c7',
          300: '#c7bca3',
          400: '#b09d7f',
          500: '#9d8565',
          600: '#8f7559',
          700: '#77604b',
          800: '#635042',
          900: '#524337',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e3e8df',
          200: '#c7d1bf',
          300: '#a4b497',
          400: '#7e9670',
          500: '#5f7a52',
          600: '#4a6141',
          700: '#3c4e36',
          800: '#32402d',
          900: '#2b3628',
        },
        terracotta: {
          50: '#fdf5f3',
          100: '#fae8e3',
          200: '#f6d4cb',
          300: '#efb5a7',
          400: '#e68b77',
          500: '#d9674f',
          600: '#c64f3a',
          700: '#a63f2f',
          800: '#88372a',
          900: '#713129',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config