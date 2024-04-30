/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        blue: '#3E68FC',
        D_blue: '#311A91',
        gray: '#F2F2F3',
        para: '#415058',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
};
