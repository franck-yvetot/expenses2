/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#40B59D',
        'background-light': '#F6F8F7',
        'background-dark': '#12201D',
        'content-light': '#111827',
        'content-dark': '#F3F4F6',
        'subtle-light': '#6B7280',
        'subtle-dark': '#9CA3AF',
        'surface-light': '#FFFFFF',
        'surface-dark': '#1F2F2B',
        'border-light': '#E5E7EB',
        'border-dark': '#374151',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};