/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060608', // Deepest Obsidian Black
          900: '#0B0B0F', // Dark Background
          850: '#111117', // Card Background
          800: '#181822', // Elevated Surface
          700: '#262636', // Subtle Border
          600: '#38384E',
        },
        violet: {
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7', // Electric Violet Accent
          600: '#9333EA',
          700: '#7E22CE',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
