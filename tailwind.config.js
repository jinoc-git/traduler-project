/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        gray1: '#EFEFEF',
        gray2: '#EDEDED',
        gray3: '#A3A3A3',
        gray4: '#979797',
      },
    },
  },
  plugins: [],
};
