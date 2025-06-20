/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae1fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8de4',
          600: '#026fc3',
          700: '#06589e',
          800: '#0a4a82',
          900: '#0e3e6d',
          950: '#0a2647',
        },
        secondary: {
          50: '#f2f9fd',
          100: '#e5f2fa',
          200: '#c5e5f6',
          300: '#92d0ee',
          400: '#57b6e3',
          500: '#309cda',
          600: '#1f7fbd',
          700: '#1c669a',
          800: '#1d577f',
          900: '#1d486a',
          950: '#142e46',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd5',
          200: '#ffdca9',
          300: '#ffc472',
          400: '#ffa337',
          500: '#ff810d',
          600: '#fb6304',
          700: '#d34607',
          800: '#aa380e',
          900: '#8a310f',
          950: '#4b1704',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};