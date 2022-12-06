const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/modules/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#FF006E',
        dark: '#B3004D',
      },
      secondary: '#3A86FF',
      tertiary: {
        DEFAULT: '#FFBE0B',
        ligth: '#FFF9E7',
      },
      white: '#fff',
      black: '#000',
      gray: colors.zinc,
    },
    extend: {
      boxShadow: {
        inner: 'inset 0 -6px 0 0 rgb(161, 161, 171, 25%)',
      },
      screens: {
        desktop: '906px',
      },
      borderRadius: {
        large: '12px',
      },
    },
  },
  plugins: [],
};
