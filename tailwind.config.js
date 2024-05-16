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
    backgroundImage: {
      'banner-img': "url('../app/assets/proposal/banner.png')",
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      sm: '360px',

      md: '720px',

      lg: '1024px',

      xl: '1280px',
    },
    extend: {
      colors: {
        blue: '#3E68FC',
        gray: '#C8CDD0',
        para: '#415058',
        cyan: '#00AEE6',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
};
