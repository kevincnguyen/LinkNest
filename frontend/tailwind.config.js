/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['bumblebee'],
  },
};
