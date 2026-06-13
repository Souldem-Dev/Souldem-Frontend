/** @type {import('tailwindcss').Config} */
module.exports = {
  images: {
    domains: ['localhost', 'your-production-domain.com'],
  },

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
        // Landing page design system
        ink: '#0A0E1A',
        'ink-800': '#0F1628',
        'ink-700': '#151D35',
        'ink-600': '#1C2644',
        'ink-500': '#253058',
        'surface': '#111827',
        'arc': '#3E68FC',
        'arc-light': '#6B8EFF',
        'arc-dim': '#1E326E',
        'ghost': 'rgba(255,255,255,0.05)',
        'ghost-border': 'rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
};
