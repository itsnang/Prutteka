const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/modules/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        light: '#FFE6F1',
        DEFAULT: '#FF006E',
        dark: '#B3004D',
      },
      secondary: {
        light: '#EBF3FF',
        DEFAULT: '#3A86FF',
      },
      tertiary: {
        light: '#FFF9E7',
        DEFAULT: '#FFBE0B',
      },
      white: '#fff',
      black: '#000',
      gray: colors.zinc,
      red: colors.red,
    },
    fontSize: {
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      xl: '1.125rem', // 18px
      '2xl': '1.25rem', // 20px
      '3xl': '1.5rem', // 24px
      '4xl': '1.75rem', // 28px
      '5xl': '2rem', // 32px
      '6xl': '2.25rem', // 36px
    },
    extend: {
      boxShadow: {
        inner: 'inset 0 -6px 0 0 rgb(161, 161, 171, 25%)',
        complete:
          '0 2px 14px 0 rgb(161, 161, 171, 25%), inset 0 -4px 0 0 rgb(161, 161, 171, 10%)',
      },
      screens: {
        xs: '375px',
      },
      borderRadius: {
        large: '12px',
      },
      spacing: {
        13: '3.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};
