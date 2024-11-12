/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // width: {
      //   container: "1230px",
      // },
      colors: {
        darkGrey: '#777',
        primary: '#fcb941',
        bBottom: '#ebebeb',
        backFont: '#1A1A1A',
        textGrey: '#666666',
      },
      backgroundColor: {
        bgWhite: 'fff',
        bgPrimary: '#fcb941',
        bgInPut: '#fafafa',
      },
      fontFamily: {
        PpLight: 'PoppinsLight',
        PpMd: 'PoppinsMedium',
        PpBold: 'PoppinsBold',
        PpExtraBold: 'PoppinsExLight',
      },
    },
  },
  plugins: [],
};
