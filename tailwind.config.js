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
        gray: '#F2F2F3',
        para: '#415058',
        cyan: '#00AEE6',
        blueLight: '#64A2EC',
        purpleLight: '#A98CE3',
        tealLight: '#8CE3CE',
        purpleDark: '#A98CE3',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
};
