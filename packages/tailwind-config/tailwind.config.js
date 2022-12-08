const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    colors: {
      primary: {
        light: '#FFE6F1',
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
      red: colors.red,
    },
    extend: {
      boxShadow: {
        inner: 'inset 0 -6px 0 0 rgb(161, 161, 171, 25%)',
        complete:
          '0 2px 14px 0 rgb(161, 161, 171, 25%), inset 0 -4px 0 0 rgb(161, 161, 171, 10%)',
      },
      screens: {
        desktop: '906px',
      },
      borderRadius: {
        large: '12px',
      },
      spacing: {
        13: '3.25rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
