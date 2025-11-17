/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'monospace'],
      },
      colors: {
        'evolv': {
          'black': '#000000',
          'white': '#FFFFFF',
          'gray-light': '#F5F5F5',
          'gray-medium': '#A9A9A9',
        },
        'emerald': {
          '50': '#ecfdf5',
          '100': '#d1fae5',
          '500': '#10b981',
          '600': '#059669',
        },
        'amber': {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '500': '#f59e0b',
          '600': '#d97706',
        },
        'red': {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '500': '#dc2626',
          '600': '#dc2626',
        },
        'blue': {
          '50': '#eff6ff',
          '100': '#dbeafe',
          '500': '#2563eb',
          '600': '#2563eb',
        }
      },
      boxShadow: {
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
};