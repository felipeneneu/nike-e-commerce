
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'dark-900': '#000000',
        'dark-700': '#8D8D8D',
        'dark-500': '#F5F5F5',
        'light-100': '#ffffff',
        'light-200': '#F5F5F5',
        'light-300': '#E5E5E5',
        'light-400': '#CCCCCC',
        'green': '#007d48',
        'red': '#d33918',
        'orange': '#d37918',
      }
    },
  },
  plugins: [],
} satisfies Config
