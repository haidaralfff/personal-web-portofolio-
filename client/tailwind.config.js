/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ivory: {
          50: '#faf9f7',
          100: '#f0eeeb',
          200: '#e4e2df',
          300: '#d4d0cc',
          400: '#8a8580',
          500: '#6b6560',
          600: '#4a4540',
          700: '#2e2a26',
          800: '#1a1814',
          900: '#0f0d0b',
        },
      },
      letterSpacing: {
        'mega': '0.25em',
      },
    },
  },
  plugins: [],
}
